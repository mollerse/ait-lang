var evaluate = require('../../src/evaluate');
var copy = require('lodash.clonedeep');

module.exports = {
  '.': function({stack}) {
    console.log(stack.pop())
  },
  'dup': function({stack}) {
    const a = stack.pop();
    stack.push(a);
    stack.push(copy(a));
  },
  'dip': function(context) {
    const {stack} = context;
    const {body: quote} = stack.pop();
    const toBeSaved = stack.pop();

    evaluate(quote, context);
    stack.push(toBeSaved);
  },
  'swap': function({stack}) {
    const a = stack.pop();
    const b = stack.pop();

    stack.push(a);
    stack.push(b);
  },
  'stack': function({stack}) {
    stack.push(stack);
  },
  'drop': function({stack}) {
    stack.pop();
  },
  'unstack': function(context) {
    context.stack = [];
  }
};
