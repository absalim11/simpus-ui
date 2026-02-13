#!/bin/bash
# Simpus OS - Stop Development Server

PORT=8087

echo "Stopping Simpus UI Server on port $PORT..."

if fuser $PORT/tcp > /dev/null 2>&1; then
    fuser -k $PORT/tcp > /dev/null 2>&1
    echo "✅ Server stopped."
else
    echo "ℹ️  No server running on port $PORT."
fi
