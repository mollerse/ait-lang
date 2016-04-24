var evaluator = require('../../src/evaluator');

module.exports = {
  '.': function(stack) {
    console.log(stack.pop())
  },
  'dup': function(stack) {
    var a = stack.pop();
    stack.push(a);
    stack.push(a);
  },
  'dip': function(stack, lexicon) {
    var quotation = stack.pop();
    var toBeSaved = stack.pop();

    evaluator.evaluate([quotation], {stack: stack, lexicon: lexicon});
    stack.push(toBeSaved);
  }
};
