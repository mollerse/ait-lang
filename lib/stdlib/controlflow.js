import jsword from '../runtime/jsword';
import { assertQuotation } from './assertions';

function ifte(falseBranch, trueBranch, testQuotation) {
  assertQuotation('ifte', testQuotation);
  assertQuotation('ifte', trueBranch);
  assertQuotation('ifte', falseBranch);

  this.evaluateQuotation(testQuotation, 0);
  const result = this.stack.pop();

  if (result) {
    this.evaluateQuotation(trueBranch);
  } else {
    this.evaluateQuotation(falseBranch);
  }
}

module.exports = {
  ifte: jsword('ifte', ifte)
};
