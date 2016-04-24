var evaluator = require('../../src/evaluator');

function runWhileCheck(check, stack, lexicon) {
  //Duplicate the top of the stack
  //One for consumption by check
  //One for next iteration
  var topOfStack = stack.pop();
  stack.push(topOfStack);
  stack.push(topOfStack);

  //Run check
  evaluator.evaluate([check], {stack: stack, lexicon: lexicon});

  //Return the result of the check
  return stack.pop();
}

module.exports = {
  'while': function(stack, lexicon) {
    var check = stack.pop();
    var loopbody = stack.pop();

    var result = runWhileCheck(check, stack, lexicon);

    while(result) {
      evaluator.evaluate([loopbody], {stack: stack, lexicon: lexicon});

      //Rerun the check
      result = runWhileCheck(check, stack, lexicon);
    }
  }
};
