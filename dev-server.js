#!/usr/bin/env node
// Minimal static file server for local editing, with a /__save endpoint that
// writes edit-mode.js's draft straight to content.js — no file picker, no
// download-then-move. Use this instead of VS Code Live Preview/Live Server
// when you want in-page edits to save directly.
//
// Run:   node dev-server.js [port]
// Open:  http://localhost:8080/  (default port 8080)

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.md': 'text/markdown',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/__save') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const target = path.join(ROOT, 'content.js');
      fs.writeFile(target, body, 'utf8', (err) => {
        if (err) {
          console.error('Save failed:', err);
          send(res, 500, 'Save failed');
        } else {
          console.log('Saved content.js');
          send(res, 200, 'OK');
        }
      });
    });
    return;
  }

  if (req.method !== 'GET') {
    send(res, 405, 'Method not allowed');
    return;
  }

  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, urlPath);

  // Prevent escaping the project root.
  if (!filePath.startsWith(ROOT)) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, 'Not found');
      return;
    }
    const ext = path.extname(filePath);
    send(res, 200, data, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
  });
});

server.listen(PORT, () => {
  console.log(`Portfolio dev server running at http://localhost:${PORT}/`);
  console.log('Edit mode saves will write directly to content.js.');
});
