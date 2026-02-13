#!/bin/bash
# MacOS Web Component - Development Script

PORT=8087

echo "Stopping any existing server on port $PORT..."
fuser -k $PORT/tcp > /dev/null 2>&1

echo "Starting Simpus UI Server on port $PORT..."
python3 simpus-server.py &
SERVER_PID=$!

echo "Server started with PID $SERVER_PID"
echo "Waiting for server to initialize..."
sleep 2

echo "Opening http://localhost:$PORT/index.html in default browser..."
if command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:$PORT/index.html"
elif command -v open &> /dev/null; then
    open "http://localhost:$PORT/index.html"
else
    echo "Could not detect web browser. Please open http://localhost:$PORT/index.html manually."
fi

echo "Press [CTRL+C] to stop the server."
wait $SERVER_PID
