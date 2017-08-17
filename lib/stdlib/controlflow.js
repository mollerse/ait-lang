import { jsWord } from '../runtime/lexicon';
import { execWithArity, word, exec } from './utils/program';

function ifte(falseBranch, trueBranch, testQuotation) {
  const ret = [word('branch'), falseBranch, trueBranch];
  ret.push.apply(ret, execWithArity(0, testQuotation));

  return ret;
}

function branch(falseBranch, trueBranch, test) {
  if (test.body) {
    return exec(trueBranch);
  } else {
    return exec(falseBranch);
  }
}

function cond(quotation, test) {
  if (test.body) {
    return exec(quotation);
  }
}

export default {
  ifte: jsWord(3, 'ifte', ifte),
  branch: jsWord(3, 'branch', branch),
  cond: jsWord(2, 'cond', cond)
};
