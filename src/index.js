var fs = require('fs');

var compile = require('./compile');
var evaluate = require('./evaluate');

function interpret(file) {
  var ast = compile(file);

  var stdlib = require('../lang/stdlib');
  var context = {
    stack: [],
    lexicon: Object.assign({}, stdlib),
    src: file
  };

  return evaluate(ast, context);
}

var context = interpret('./examples/circle.ait');
// console.log(context.stack);
// console.log(global.canvas);
