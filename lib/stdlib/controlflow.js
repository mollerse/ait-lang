import jsword from '../runtime/jsword';
import { assertQuotation } from './assertions';

function ifte(trueBranch, falseBranch, testQuote) {
  assertQuotation('ifte', trueBranch);
  assertQuotation('ifte', falseBranch);
  assertQuotation('ifte', testQuote);

  this.evaluateQuotation(testQuote);
  const t = this.stack.pop();
  if(t) {
    this.evaluateQuotation(trueBranch);
  } else {
    this.evaluateQuotation(falseBranch);
  }
}

module.exports = {
  ifte: jsword('ifte', ifte)
};
