const http = require('http');
const fs = require('fs');

// const delay = (ms) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, ms)
//   })
// } 

// const readFile = (path) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, (err, data) => {
//       if(err) {
//         reject(err);
//       };
//       resolve(data);
//     });
//   })
// } 

const getBody = (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', function (data) {
      if(!data) {
        return;
      }
      body += data;
    });
    req.on('end', function () {
      const parsed = JSON.parse(body);
      resolve(parsed);
    });
  })
}

const existFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.exists(path, (isExist) => {
      resolve(isExist)
    })
  })
} 

const writeData = (path, data) => {
  return new Promise((resolve) => {
    const writeStream = fs.createWriteStream(path);
    writeStream.write(data);
    resolve(data);
    writeStream.end();
  })
}

const postFile = async (req, res) => {
  try {
    const body = await getBody(req);
    if(!body?.fileName || !body?.data) {
      res.write(`Your request body is not completed!!!`);
      res.end();
      return;
    }
    const response = await existFile(`./db/${body.fileName}.txt`);
    if(response) {
      const readStream = fs.createReadStream(`./db/${body.fileName}.txt`);
      readStream.on('data', chunk => {
        if(!chunk) {
          return;
        }
        writeData(`./db/${body.fileName}.txt`, chunk + body.data);
      });
      readStream.on('end', () => {
        res.end();
      });
    } else {
      await writeData(`./db/${body.fileName}.txt`, body.data);
      res.end();
    }
  } catch {
    console.log('ERROR');
  }
}

const deleteFile = async (fileName, res) => {
  try {
    const response = await existFile(`./db/${fileName}.txt`);
    if(response) {
      fs.unlink( `./db/${fileName}.txt`, () => {
        res.write(fileName + ' DELETED');
        res.end();
      })
    } else {
      res.write(fileName + '.txt' + ' not found');
      res.end();
    }
  } catch {
  }
}

const server = http.createServer(async (
  request, response
) => {
  const parsedUrl = request.url.split('/');
  switch(parsedUrl[1]) {
    case 'write' :
      if(request.method === 'GET') {
        
      } else if(request.method === 'POST') {
        await postFile(request, response);
      } else if(request.method === 'PATCH') {
      } else if(request.method === 'DELETE') {
        await deleteFile(parsedUrl[2], response);
      }
      break;
    default :
      response.write(`ERROR 404 ${request.url} is unknown`);
      response.end('ERROR 404');
  }
})

server.listen(3005)