var evaluate = require('../../src/evaluate');

function runWhileCheck(checkQuotation, context) {
  var stack = context.stack;
  //Duplicate the top of the stack
  //One for consumption by check
  //One for next iteration
  var topOfStack = stack.pop();
  stack.push(topOfStack);
  stack.push(topOfStack);

  //Run check
  evaluate([checkQuotation.body], context);

  //Return the result of the check
  return stack.pop();
}

module.exports = {
  'while': function(context) {
    var stack = context.stack;
    var checkQuotation = stack.pop();
    var loopQuotation = stack.pop();

    var result = runWhileCheck(checkQuotation, context);

    while(result) {
      evaluate([loopQuotation.body], context);

      //Rerun the check
      result = runWhileCheck(checkQuotation, context);
    }
  }
};
