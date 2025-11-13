const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/save-record' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);  // Parse incoming record
        const entry = `Track: ${data.trackId || 'unknown'}, Time: ${data.time || 'unknown'}, Replay: ${data.replay || 'none'}\n`;
        fs.appendFile('records.txt', entry, (err) => {
          if (err) console.error('Write error:', err);
        });
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Saved');
      } catch (e) {
        console.error('Parse error:', e);
        res.writeHead(500);
        res.end('Error');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(4000, () => console.log('Listening on 4000'));