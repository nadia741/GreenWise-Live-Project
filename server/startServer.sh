#!/bin/bash

# GreenWise Server Startup Script

echo "🌱 Starting GreenWise Server..."

# Kill any existing processes
echo "🔄 Cleaning up existing processes..."
pkill -f "node server.js" || true
pkill -f "nodemon" || true

# Wait a moment
sleep 2

# Check if port 5001 is free
if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5001 is in use, killing process..."
    kill -9 $(lsof -ti:5001) || true
    sleep 2
fi

# Start the server
echo "🚀 Starting server on port 5001..."
cd "$(dirname "$0")"

# Export environment variables
export NODE_ENV=development
export PORT=5001

# Start the server in background
nohup node server.js > server.log 2>&1 &
SERVER_PID=$!

echo "📝 Server started with PID: $SERVER_PID"
echo "📋 Logs: tail -f server.log"

# Wait a moment and check if server is running
sleep 3

if curl -s http://localhost:5001/health > /dev/null; then
    echo "✅ Server is running successfully!"
    echo "🔗 Health check: http://localhost:5001/health"
    echo "🔗 API Base: http://localhost:5001/api"
else
    echo "❌ Server failed to start!"
    echo "📋 Check logs: cat server.log"
    exit 1
fi
