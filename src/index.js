const {readFileSync} = require('fs');

const parse = require('./parse');
const evaluate = require('./evaluate');

module.exports = function interpret(file) {
  const source = readFileSync(file, 'utf8').toString();
  const ast = parse(source);

  const stdlib = require('../lang/stdlib');
  const context = {
    stack: [],
    lexicon: Object.assign({}, stdlib),
    src: file
  };

  return evaluate(ast, context);
}
