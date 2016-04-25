var fs = require('fs');

var tokenize = require('./tokenize');
var lex = require('./lex');
var parse = require('./parse');

module.exports = function compile(file) {
  var source = fs.readFileSync(file).toString();

  var ast = tokenize(source)
    .map(lex)
    .map(parse);

  return ast;
}
