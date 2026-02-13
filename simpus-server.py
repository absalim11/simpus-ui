import http.server
import socketserver
import os

PORT = 8087

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse path to remove query strings for existence check
        path = self.path.split('?')[0]
        
        # Serve the file if it exists
        if os.path.exists(path[1:]) or path == '/':
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        
        # If not found, serve the 404.html page with 404 status code
        self.send_response(404)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
        if os.path.exists('404.html'):
            with open('404.html', 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.wfile.write(b'404 Not Found (Custom Page Missing)')

print(f"Serving Simpus UI on port {PORT}...")
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    httpd.serve_forever()
