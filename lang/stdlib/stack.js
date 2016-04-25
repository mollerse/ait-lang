var evaluate = require('../../src/evaluate');
var copy = require('lodash.clonedeep');

module.exports = {
  '.': function(context) {
    var stack = context.stack;
    console.log(stack.pop())
  },
  'dup': function(context) {
    var stack = context.stack;
    var a = stack.pop();
    stack.push(a);
    stack.push(copy(a));
  },
  'dip': function(context) {
    var stack = context.stack;
    var quotation = stack.pop();
    var toBeSaved = stack.pop();

    evaluate([quotation.body], context);
    stack.push(toBeSaved);
  },
  'swap': function(context) {
    var stack = context.stack;
    var second = stack.pop();
    var first = stack.pop();

    stack.push(first);
    stack.push(second);
  },
  'stack': function(context) {
    context.stack.push(context.stack);
  },
  'drop': function(context) {
    context.stack.pop();
  }
};
