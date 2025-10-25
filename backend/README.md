# LocalTranscribe Analytics Backend

Simple Flask API for collecting website analytics and conversion tracking.

## Features

- **Event Tracking**: Page views, clicks, form submissions, conversions
- **Session Management**: User session tracking with duration and page counts
- **Conversion Funnel**: Track user progression through signup funnel
- **Contact Form**: Email delivery via Resend API
- **GDPR Compliance**: Respects cookie consent from frontend
- **Offline Support**: Frontend can queue events when backend is unavailable
- **Export Capabilities**: JSON/CSV export for external analysis
- **Real-time Dashboard**: Simple HTML dashboard for key metrics

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your RESEND_API_KEY

# Run development server
python app.py

# Access dashboard
open http://localhost:5000
```

## API Endpoints

### POST /api/track
Submit analytics events from frontend
```javascript
{
  "sessionId": "lt_1234567890_abc123",
  "type": "event",
  "category": "conversion",
  "action": "signup_submit",
  "path": "/signup/",
  "timestamp": 1640995200000
}
```

### GET /api/metrics?days=7
Get dashboard metrics
```json
{
  "metrics": {
    "total_visitors": 1247,
    "conversions": 42,
    "conversion_rate": 3.4,
    "avg_session_pages": 2.8
  },
  "traffic_sources": [...],
  "funnel_data": [...],
  "recent_conversions": [...]
}
```

### GET /api/funnel?days=7
Get conversion funnel data
```json
{
  "homepage_views": 1247,
  "vertical_views": 424,
  "pricing_views": 224,
  "demo_views": 87,
  "conversions": 42
}
```

### GET /api/export?format=json&days=30
Export analytics data for external analysis

### POST /api/contact
Submit contact form (sends email via Resend)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Sales inquiry",
  "message": "I'm interested in LocalTranscribe...",
  "company": "Acme Corp",
  "phone": "555-1234",
  "product": "localtranscribe",
  "inquiryType": "sales"
}
```

Response:
```json
{
  "status": "success",
  "message": "Your message has been sent successfully!"
}
```

### GET /health
Health check endpoint

## Resend Email Integration

The contact form uses [Resend](https://resend.com) for email delivery.

### Setup Instructions

1. **Get Resend API Key**:
   - Sign up at https://resend.com
   - Navigate to API Keys section
   - Create a new API key

2. **Configure Environment**:
   ```bash
   # In backend/.env
   RESEND_API_KEY=re_your_api_key_here
   ```

3. **Verify Domain** (for production):
   - Add your domain in Resend dashboard
   - Add DNS records to verify ownership
   - Update the "from" email in `app.py` line 391

4. **Test Locally**:
   ```bash
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "subject": "Test",
       "message": "Testing contact form"
     }'
   ```

### Email Template

The contact form sends emails with:
- **From**: `Lexopoly Contact Form <contact@lexopoly.com>`
- **To**: `contact@lexopoly.com`
- **Reply-To**: Customer's email address
- **Subject**: `Contact Form: {subject}`
- **Body**: HTML formatted with customer details and message

### Migration from Formspree

Previous implementation used Formspree. Migration completed October 2025:
- ✅ Removed Formspree dependency
- ✅ Self-hosted email delivery via Resend
- ✅ Full control over email formatting and routing
- ✅ Better analytics integration

## Database Schema

### events
- session_id, event_type, category, action, label, value
- path, timestamp, user_agent, ip_address, referrer

### sessions
- session_id, first_seen, last_seen, page_count, conversion_count
- source, user_agent, ip_address

### conversions
- session_id, conversion_type, source_path, value, timestamp

## Production Deployment

1. **Environment Variables**:
   ```bash
   export FLASK_ENV=production
   export RESEND_API_KEY=re_your_production_api_key
   export DATABASE_URL=postgresql://... # Optional: Use PostgreSQL
   ```

2. **Use Gunicorn**:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

3. **Reverse Proxy** (nginx):
   ```nginx
   location /api/ {
       proxy_pass http://localhost:5000/api/;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
   }
   ```

4. **Database Backup**:
   ```bash
   # Backup SQLite
   cp analytics.db analytics_backup_$(date +%Y%m%d).db

   # Or export to CSV
   curl "http://localhost:5000/api/export?format=csv&days=365"
   ```

## Frontend Integration

Add to your HTML pages:
```html
<script src="/js/analytics.js"></script>
```

The frontend will automatically:
- Show GDPR cookie consent banner
- Track page views, clicks, and conversions
- Send data to Flask backend at `/api/track`
- Store events offline if backend is unavailable

## Security Notes

- Add authentication for production use
- Use HTTPS in production
- Consider rate limiting for /api/track endpoint
- Regularly backup database
- Review and clean old data

## Monitoring

- Check `/health` endpoint for service status
- Monitor database size growth
- Track API response times
- Set up alerts for high error rates

## Development

Run with debug mode:
```bash
python app.py
```

Database is automatically created as `analytics.db` in the same directory.

For testing, you can manually insert events:
```bash
curl -X POST http://localhost:5000/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session",
    "type": "event",
    "category": "test",
    "action": "manual_test",
    "timestamp": 1640995200000
  }'
```