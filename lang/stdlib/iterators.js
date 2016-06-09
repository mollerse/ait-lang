const evaluate = require('../../src/evaluate');
const copy = require('lodash.clonedeep');

function runWhileCheck(quote, context) {
  const {stack} = context;
  //Duplicate the top of the stack
  //One for consumption by check
  //One for next iteration
  const topOfStack = stack.pop();
  stack.push(topOfStack);
  stack.push(copy(topOfStack));

  //Run check
  evaluate(quote, context);

  //Return the result of the check
  return stack.pop();
}

module.exports = {
  'while': function(context) {
    const {stack} = context;
    const {body: checkQuotation} = stack.pop();
    const {body: loopQuotation} = stack.pop();

    let result = runWhileCheck(checkQuotation, context);

    while(result) {
      evaluate(loopQuotation, context);

      //Rerun the check
      result = runWhileCheck(checkQuotation, context);
    }
  }
};
