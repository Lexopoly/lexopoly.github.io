#!/bin/bash
set -e

echo "🚀 LocalTranscribe Analytics Backend Deployment"
echo "================================================"

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if analytics.db exists, create if not
if [ ! -f "analytics.db" ]; then
    echo "🗄️  Initializing database..."
    python3 -c "from app import init_db; init_db(); print('Database initialized')"
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 To start the analytics backend:"
echo "   source venv/bin/activate"
echo "   python app.py"
echo ""
echo "📊 Dashboard will be available at: http://localhost:5000"
echo "🔗 API endpoint for frontend: http://localhost:5000/api/track"
echo ""
echo "🧪 Test with:"
echo "   curl http://localhost:5000/health"
echo ""

# Optional: Start the server
read -p "Start the analytics server now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting analytics backend..."
    python app.py
fi