@echo off
echo Starting Celebify.AI Development Environment...
echo.

echo Installing dependencies...
call npm install
cd server
call npm install
cd ../client
call npm install
cd ..

echo.
echo Starting development servers...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.

start "Backend Server" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak > nul
start "Frontend Client" cmd /k "cd client && npm start"

echo.
echo Development servers started!
echo Open http://localhost:3000 in your browser
echo.
pause





