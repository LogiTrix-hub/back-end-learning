let phrases;

exports.connect = () => {
  phrases = require('./ru');
}

exports.getPhrase = (phrase) => {
  if(!phrases[phrase]) {
    throw new Error(phrase + ' is unknown...')
  }
  console.log(phrase + ' ===> ' + phrases[phrase])
}
 