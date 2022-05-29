const fs = require('fs');

const stream = new fs.ReadStream(__dirname + '/images/testImage.jpeg');

stream.on('readable', () => {
  const data = stream.read();
  console.log(data?.length);
})

stream.on('end', () => {
  console.log('THE END!!!');
})