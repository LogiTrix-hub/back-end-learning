const http = require('http');
const url = require('url');
const fs = require('fs');
const {
  subscribe,
  publish
} = require('./chat');

const checkAccess = (req) => {
  return url.parse(req.url, true).query.token === ':3'
}

const sendFile = (fileName, res) => {
  const fileStream = fs.createReadStream(__dirname + fileName);
  fileStream
    .on('error', () => {
      res.statusCode = 500;
      res.end('Server error 123');
    })
    // .pipe(res)
    .on('data', (chunk) => {
      res.end(chunk);
    })
    .on('error', () => {
      res.statusCode = 500;
      res.end('Server error 321');
    })
}

const server = http.createServer((req, res) => {
  if(req.url === "/") {
    sendFile('/index.html', res);
  } else if(req.url === '/subscribe') {
    subscribe(req, res);
  } else if(req.url === '/send') {
    let body = "";
    req
      .on('readable', () => {
        const chunk = req.read()
        console.log(chunk);
        if(chunk) {
          body += chunk;
        } 
      })
      .on('end', () => {
        publish(body);
        res.end('Ok');
      })
    // publish(req);
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3006)