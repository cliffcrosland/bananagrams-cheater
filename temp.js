var fs = require('fs');
var EOL = require('os').EOL;

fs.readFile('/usr/share/dict/words', function (err, data) {
  var goodWords = [];
  var words = data.toString().split(EOL);
  console.log(words);
};