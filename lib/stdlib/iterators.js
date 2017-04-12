import jsword from '../runtime/jsword';

const whileLoop = jsword('while', function(loopQuote, checkQuote) {
  const stack = this.stack;

  this.evaluateQuotation(checkQuote);
  let result = stack.pop();

  while (result) {
    this.evaluateQuotation(loopQuote);
    this.evaluateQuotation(checkQuote);
    result = stack.pop();
  }
});

module.exports = { while: whileLoop };
