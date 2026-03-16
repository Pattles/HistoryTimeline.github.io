const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    // Serve the HTML page
    if (req.url === '/' || req.url === '/index.html') {
        const file = fs.readFileSync(path.join(__dirname, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(file);
    }

    // Save a new event
    else if (req.url === '/add-event' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const newEvent = JSON.parse(body);
            const events = JSON.parse(fs.readFileSync('events.json'));
            events.push(newEvent);
            fs.writeFileSync('events.json', JSON.stringify(events, null, 2));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
    }

    // Read events.json
    else if (req.url === '/get-events' && req.method === 'GET') {
        const events = JSON.parse(fs.readFileSync('events.json'));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(events));
    }

    // Serve static files (css, js)
    else {
        const ext = path.extname(req.url);
        const types = {
            '.css': 'text/css',
            '.js': 'application/javascript'
        };
        if (types[ext]) {
            const file = fs.readFileSync(path.join(__dirname, req.url));
            res.writeHead(200, { 'Content-Type': types[ext] });
            res.end(file);
        }
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});