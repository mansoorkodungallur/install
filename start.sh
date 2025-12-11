#!/bin/bash

echo "Starting Doha Offers MVP..."
echo ""

# Check if node_modules exist
if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo ""
echo "Starting backend server on http://localhost:5000..."
cd backend && npm start > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 3

echo "Starting frontend server on http://localhost:3000..."
cd frontend && npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "====================================="
echo "✅ Doha Offers MVP is running!"
echo "====================================="
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "To stop the servers, run: kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Logs are available in:"
echo "  - logs/backend.log"
echo "  - logs/frontend.log"
echo ""
