var fs = require('fs');

var compiler = require('./compiler');
var evaluator = require('./evaluator');

function interpret(file) {
  var ast = compiler.compile(file);

  var stdlib = require('../lang/stdlib');
  var context = {stack: [], lexicon: Object.assign({}, stdlib)};

  return evaluator.evaluate(ast, context);
}

var context = interpret('./examples/circle.ait');
console.log(JSON.stringify(context.stack, null, 2));
// console.log(global.canvas);
