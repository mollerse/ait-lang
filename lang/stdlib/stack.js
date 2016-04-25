var evaluate = require('../../src/evaluate');

module.exports = {
  '.': function(context) {
    var stack = context.stack;
    console.log(stack.pop())
  },
  'dup': function(context) {
    var stack = context.stack;
    var a = stack.pop();
    stack.push(a);
    stack.push(a);
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
  }
};
