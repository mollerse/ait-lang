var tokenize = require('./tokenize');
var lex = require('./lex');
var parse = require('./parse');

module.exports = function compile(source) {
  var ast = tokenize(source)
    .map(lex)
    .map(parse);

  return ast;
}
