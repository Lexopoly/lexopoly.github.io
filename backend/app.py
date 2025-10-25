#!/usr/bin/env python3
"""
LocalTranscribe Analytics Backend
Simple Flask API for collecting website analytics and conversion tracking
"""

from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import sqlite3
import json
import datetime
from collections import defaultdict, Counter
import os
import resend

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Database setup
DATABASE = 'analytics.db'

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')

def init_db():
    """Initialize the SQLite database with required tables"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Events table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            event_type TEXT NOT NULL,
            category TEXT,
            action TEXT,
            label TEXT,
            value INTEGER,
            path TEXT,
            timestamp INTEGER,
            user_agent TEXT,
            ip_address TEXT,
            referrer TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Sessions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            session_id TEXT PRIMARY KEY,
            first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
            page_count INTEGER DEFAULT 1,
            conversion_count INTEGER DEFAULT 0,
            source TEXT,
            user_agent TEXT,
            ip_address TEXT
        )
    ''')

    # Conversions table for detailed tracking
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS conversions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            conversion_type TEXT NOT NULL,
            source_path TEXT,
            value REAL,
            timestamp INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Enable column access by name
    return conn

@app.route('/api/track', methods=['POST'])
def track_event():
    """Endpoint to receive analytics events from frontend"""
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        conn = get_db()
        cursor = conn.cursor()

        # Extract common fields
        session_id = data.get('sessionId')
        event_type = data.get('type')
        category = data.get('category')
        action = data.get('action')
        label = data.get('label')
        value = data.get('value')
        path = data.get('path')
        timestamp = data.get('timestamp')
        referrer = data.get('referrer', '')

        # Get client info
        user_agent = request.headers.get('User-Agent', '')
        ip_address = request.remote_addr

        # Insert event
        cursor.execute('''
            INSERT INTO events (
                session_id, event_type, category, action, label, value,
                path, timestamp, user_agent, ip_address, referrer
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (session_id, event_type, category, action, label, value,
              path, timestamp, user_agent, ip_address, referrer))

        # Update or create session
        cursor.execute('''
            INSERT OR REPLACE INTO sessions (
                session_id, first_seen, last_seen, page_count, source, user_agent, ip_address
            ) VALUES (
                ?,
                COALESCE((SELECT first_seen FROM sessions WHERE session_id = ?), CURRENT_TIMESTAMP),
                CURRENT_TIMESTAMP,
                COALESCE((SELECT page_count FROM sessions WHERE session_id = ?) + 1, 1),
                ?,
                ?, ?
            )
        ''', (session_id, session_id, session_id, referrer, user_agent, ip_address))

        # Track conversions separately
        if category == 'conversion':
            cursor.execute('''
                INSERT INTO conversions (session_id, conversion_type, source_path, value, timestamp)
                VALUES (?, ?, ?, ?, ?)
            ''', (session_id, action, path, value, timestamp))

            # Update session conversion count
            cursor.execute('''
                UPDATE sessions
                SET conversion_count = conversion_count + 1
                WHERE session_id = ?
            ''', (session_id,))

        conn.commit()
        conn.close()

        return jsonify({'status': 'success'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get key metrics for dashboard"""
    try:
        conn = get_db()

        # Time filter
        days = int(request.args.get('days', 7))
        since = datetime.datetime.now() - datetime.timedelta(days=days)

        # Total visitors (unique sessions)
        visitors = conn.execute('''
            SELECT COUNT(DISTINCT session_id) as count
            FROM sessions
            WHERE first_seen >= ?
        ''', (since,)).fetchone()['count']

        # Total conversions
        conversions = conn.execute('''
            SELECT COUNT(*) as count
            FROM conversions
            WHERE created_at >= ?
        ''', (since,)).fetchone()['count']

        # Conversion rate
        conversion_rate = (conversions / visitors * 100) if visitors > 0 else 0

        # Average session duration (pages per session as proxy)
        avg_pages = conn.execute('''
            SELECT AVG(page_count) as avg_pages
            FROM sessions
            WHERE first_seen >= ?
        ''', (since,)).fetchone()['avg_pages'] or 0

        # Traffic sources
        sources = conn.execute('''
            SELECT
                CASE
                    WHEN source LIKE '%google%' THEN 'Google Organic'
                    WHEN source = '' OR source IS NULL THEN 'Direct Traffic'
                    WHEN source LIKE '%facebook%' OR source LIKE '%twitter%' THEN 'Social Media'
                    WHEN source LIKE '%email%' THEN 'Email Campaign'
                    ELSE 'Other'
                END as source_type,
                COUNT(*) as visitors,
                SUM(conversion_count) as conversions
            FROM sessions
            WHERE first_seen >= ?
            GROUP BY source_type
            ORDER BY visitors DESC
        ''', (since,)).fetchall()

        # Funnel data
        funnel_steps = conn.execute('''
            SELECT
                CASE
                    WHEN path = '/' THEN 'Homepage'
                    WHEN path LIKE '%/lawyers/%' OR path LIKE '%/journalists/%'
                         OR path LIKE '%/government/%' OR path LIKE '%/education/%'
                         OR path LIKE '%/dictation/%' OR path LIKE '%/court-reporters/%'
                         OR path LIKE '%/production/%' THEN 'Vertical Pages'
                    WHEN path LIKE '%/pricing/%' THEN 'Pricing'
                    WHEN path LIKE '%/demo/%' THEN 'Demo'
                    WHEN path LIKE '%/signup/%' THEN 'Signup'
                    ELSE 'Other'
                END as step,
                COUNT(DISTINCT session_id) as visitors
            FROM events
            WHERE timestamp >= ? AND event_type = 'page_view'
            GROUP BY step
            ORDER BY visitors DESC
        ''', (int(since.timestamp() * 1000),)).fetchall()

        # Recent conversions
        recent_conversions = conn.execute('''
            SELECT
                c.conversion_type,
                c.source_path,
                c.created_at,
                CASE
                    WHEN c.source_path LIKE '%/lawyers/%' THEN 'Legal Professional'
                    WHEN c.source_path LIKE '%/journalists/%' THEN 'Media Professional'
                    WHEN c.source_path LIKE '%/government/%' THEN 'Government'
                    WHEN c.source_path LIKE '%/education/%' THEN 'Education'
                    ELSE 'General'
                END as segment
            FROM conversions c
            ORDER BY c.created_at DESC
            LIMIT 10
        ''').fetchall()

        conn.close()

        return jsonify({
            'metrics': {
                'total_visitors': visitors,
                'conversions': conversions,
                'conversion_rate': round(conversion_rate, 1),
                'avg_session_pages': round(avg_pages, 1)
            },
            'traffic_sources': [dict(row) for row in sources],
            'funnel_data': [dict(row) for row in funnel_steps],
            'recent_conversions': [dict(row) for row in recent_conversions]
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/funnel', methods=['GET'])
def get_funnel_data():
    """Get detailed conversion funnel data"""
    try:
        conn = get_db()
        days = int(request.args.get('days', 7))
        since = datetime.datetime.now() - datetime.timedelta(days=days)

        # Get step-by-step funnel progression
        funnel_query = '''
            WITH funnel_steps AS (
                SELECT
                    session_id,
                    MAX(CASE WHEN path = '/' THEN 1 ELSE 0 END) as homepage,
                    MAX(CASE WHEN category = 'funnel' AND action LIKE 'vertical_%' THEN 1 ELSE 0 END) as vertical,
                    MAX(CASE WHEN path LIKE '%/pricing/%' THEN 1 ELSE 0 END) as pricing,
                    MAX(CASE WHEN path LIKE '%/demo/%' OR category = 'funnel' AND action = 'demo_page_view' THEN 1 ELSE 0 END) as demo,
                    MAX(CASE WHEN category = 'conversion' THEN 1 ELSE 0 END) as conversion
                FROM events
                WHERE timestamp >= ?
                GROUP BY session_id
            )
            SELECT
                SUM(homepage) as homepage_views,
                SUM(vertical) as vertical_views,
                SUM(pricing) as pricing_views,
                SUM(demo) as demo_views,
                SUM(conversion) as conversions
            FROM funnel_steps
        '''

        result = conn.execute(funnel_query, (int(since.timestamp() * 1000),)).fetchone()
        conn.close()

        return jsonify(dict(result))

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/export', methods=['GET'])
def export_data():
    """Export analytics data for external analysis"""
    try:
        conn = get_db()
        format_type = request.args.get('format', 'json')
        days = int(request.args.get('days', 30))
        since = datetime.datetime.now() - datetime.timedelta(days=days)

        # Get all events
        events = conn.execute('''
            SELECT * FROM events
            WHERE created_at >= ?
            ORDER BY timestamp DESC
        ''', (since,)).fetchall()

        # Get all sessions
        sessions = conn.execute('''
            SELECT * FROM sessions
            WHERE first_seen >= ?
            ORDER BY first_seen DESC
        ''', (since,)).fetchall()

        # Get all conversions
        conversions = conn.execute('''
            SELECT * FROM conversions
            WHERE created_at >= ?
            ORDER BY created_at DESC
        ''', (since,)).fetchall()

        conn.close()

        data = {
            'export_date': datetime.datetime.now().isoformat(),
            'period_days': days,
            'events': [dict(row) for row in events],
            'sessions': [dict(row) for row in sessions],
            'conversions': [dict(row) for row in conversions]
        }

        if format_type == 'csv':
            # Simple CSV export for events
            import csv
            import io
            output = io.StringIO()
            writer = csv.DictWriter(output, fieldnames=data['events'][0].keys() if data['events'] else [])
            writer.writeheader()
            writer.writerows(data['events'])

            response = app.response_class(
                output.getvalue(),
                mimetype='text/csv',
                headers={'Content-Disposition': 'attachment; filename=localtranscribe_analytics.csv'}
            )
            return response

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def contact_form():
    """Handle contact form submissions via Resend"""
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Validate required fields
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        if not all([name, email, subject, message]):
            return jsonify({'error': 'All fields are required'}), 400

        # Basic email validation
        if '@' not in email or '.' not in email:
            return jsonify({'error': 'Invalid email address'}), 400

        # Check if Resend API key is configured
        if not resend.api_key:
            return jsonify({'error': 'Email service not configured'}), 500

        # Send email via Resend
        params = {
            "from": "Lexopoly Contact Form <onboarding@resend.dev>",
            "to": ["admin@lexopoly.com"],
            "reply_to": email,
            "subject": f"Contact Form: {subject}",
            "html": f"""
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Subject:</strong> {subject}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>{message.replace(chr(10), '<br>')}</p>
            """
        }

        email_response = resend.Emails.send(params)

        return jsonify({
            'status': 'success',
            'message': 'Your message has been sent successfully!'
        }), 200

    except Exception as e:
        print(f"Contact form error: {str(e)}")
        return jsonify({
            'error': 'Failed to send message. Please try again later.'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat(),
        'database': 'connected' if os.path.exists(DATABASE) else 'not_found'
    })

@app.route('/')
def dashboard():
    """Simple dashboard view"""
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>LocalTranscribe Analytics API</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .endpoint { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 4px; }
            .method { color: #007acc; font-weight: bold; }
        </style>
    </head>
    <body>
        <h1>🚀 LocalTranscribe Analytics API</h1>
        <p>Simple Flask backend for website analytics and conversion tracking</p>

        <h2>Available Endpoints:</h2>

        <div class="endpoint">
            <span class="method">POST</span> /api/track - Submit analytics events
        </div>

        <div class="endpoint">
            <span class="method">GET</span> /api/metrics?days=7 - Get dashboard metrics
        </div>

        <div class="endpoint">
            <span class="method">GET</span> /api/funnel?days=7 - Get conversion funnel data
        </div>

        <div class="endpoint">
            <span class="method">GET</span> /api/export?format=json&days=30 - Export data
        </div>

        <div class="endpoint">
            <span class="method">POST</span> /api/contact - Submit contact form (Resend integration)
        </div>

        <div class="endpoint">
            <span class="method">GET</span> /health - Health check
        </div>

        <h2>Quick Start:</h2>
        <pre>
# Install dependencies
pip install flask flask-cors

# Run the server
python app.py

# Test the API
curl http://localhost:5000/health
        </pre>

        <p><strong>Frontend Integration:</strong> Update your analytics.js to send events to <code>/api/track</code></p>
    </body>
    </html>
    '''

if __name__ == '__main__':
    # Initialize database on startup
    init_db()
    print("🚀 LocalTranscribe Analytics Backend Starting...")
    print("📊 Database initialized")
    print("🌐 API available at http://localhost:5000")
    print("📈 Dashboard at http://localhost:5000")

    # Run development server
    app.run(debug=True, host='0.0.0.0', port=5000)