import jsword from '../runtime/jsword';
import { assertQuotation } from './assertions';

const whileLoop = jsword('while', function(loopQuote, checkQuote) {
  assertQuotation('while', loopQuote);
  assertQuotation('while', checkQuote);
  const stack = this.stack;

  this.evaluateQuotation(checkQuote);
  let result = stack.pop();

  while (result) {
    this.evaluateQuotation(loopQuote);
    this.evaluateQuotation(checkQuote);
    result = stack.pop();
  }
});

const times = jsword('times', function(loopQuote, n) {
  assertQuotation('times', loopQuote);

  for (let i = 0; i < n; i++) {
    this.evaluateQuotation(loopQuote);
  }
});

module.exports = {
  while: whileLoop,
  times
};
