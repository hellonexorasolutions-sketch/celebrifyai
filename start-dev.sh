#!/bin/bash

echo "Starting Celebify.AI Development Environment..."
echo

echo "Installing dependencies..."
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

echo
echo "Starting development servers..."
echo "Backend will run on http://localhost:5000"
echo "Frontend will run on http://localhost:3000"
echo

# Start backend in background
cd server && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
cd ../client && npm start &
FRONTEND_PID=$!

echo
echo "Development servers started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Open http://localhost:3000 in your browser"
echo

# Wait for user to stop
wait







