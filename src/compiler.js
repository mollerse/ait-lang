var fs = require('fs');

var tokenizer = require('./tokenizer');
var lexer = require('./lexer');
var parser = require('./parser');

module.exports.compile = function compile(file) {
  var source = fs.readFileSync(file).toString();

  var ast = tokenizer.tokenize(source)
    .map(lexer.lex)
    .map(parser.parse);

  ast.metadata = {
    source: file
  };

  return ast;
}
