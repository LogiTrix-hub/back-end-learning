const http = require('http');
const fs = require('fs');

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
} 

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) {
        reject(err);
      };
      resolve(data);
    });
  })
} 

const server = http.createServer(async (
  request, response
) => {
  switch(request.url) {
    case '/home' :
      await delay(1000);
      const firstPage = await readFile('./pages/first.html');
      response.write(firstPage);
      response.end();
      break;
    case '/about' :
      await delay(3000);
      const aboutPage = await readFile('./pages/about.html');
      response.write(aboutPage);
      response.end();
      break;
    default :
      response.write(`ERROR 404 ${request.url} is unknown`);
      response.end();
  }
})

server.listen(3005)