#!/usr/bin/env node

/*
server.js: launches a static file web server from the current folder

can make executable with `chmod +x ./server.js`
run with `node ./server.js [port]` or `./server.js [port]`
where `[port]` is an optional HTTP port (8888 by default)

Serves the correct MIME type and defaults to index.html
*/
(() => {

  'use strict';

  const
    http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    port = parseInt(process.argv[2] || 8888, 10),
    mime = {
      '.html': 'text/html',
      '.htm':  'text/html',
      '.css':  'text/css',
      '.js':   'application/javascript',
      '.json': 'application/json',
      '.jp':   'image/jpeg',
      '.mjs':  'application/javascript',
      '.png':  'image/png',
      '.gif':  'image/gif',
      '.ico':  'image/x-icon',
      '.svg':  'image/svg+xml',
      '.txt':  'text/plain'
    };

  // new server
  http.createServer((req, res) => {

    let
      uri = url.parse(req.url).pathname,
      filename = path.join(process.cwd(), uri);

    // file available?
    fs.access(filename, fs.constants.R_OK, (err) => {

    // not found
      if (err) {
        serve(404, '404 Not Found\n');
        return;
      }

      // index.html default
      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      // read file
      fs.readFile(filename, (err, file) => {

        if (err) {
          // server error
          serve(500, err + '\n');
        }
        else {
          // show content
          serve(200, file, mime[path.extname(filename)]);
        }

      });
    });

    // serve content
    function serve(code, content, type) {
      res.writeHead(code, { 'Content-Type': type || mime['.txt'] });
      res.write(content);
      res.end();
    }

  }).listen(port);

  console.log('Server running at http://localhost:' + port);

})();
