import jsword from '../runtime/jsword';
import { assertQuotation } from './assertions';

function ifte(falseBranch, trueBranch, bool) {
  assertQuotation('ifte', trueBranch);
  assertQuotation('ifte', falseBranch);

  if(bool) {
    this.evaluateQuotation(trueBranch);
  } else {
    this.evaluateQuotation(falseBranch);
  }
}

module.exports = {
  ifte: jsword('ifte', ifte)
};
