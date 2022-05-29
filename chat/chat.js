let visitors = [];

exports.subscribe = (req, res) => {
  visitors.push(res);
  res.on('close', () => {
    visitors.splice(visitors.indexOf(res), 1)
  })
};

exports.publish = (message) => {
  visitors.forEach((res) => {
    res.end(message)
  });
  visitors = [];
};