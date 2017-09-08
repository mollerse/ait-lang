import { jsWord } from '../runtime/lexicon';
import { execWithArity, exec, word, quotation, assignVariable } from './utils/program';

function whileLoop(loopQuote, checkQuote) {
  const rec = [];
  rec.push(word('while'), loopQuote, checkQuote);
  rec.push.apply(rec, exec(loopQuote));

  const ret = [word('cond'), quotation(rec)];
  ret.push.apply(ret, execWithArity(0, checkQuote));

  return ret;
}

function times(loopQuote, n) {
  let ret = [];

  for (let i = 0; i < n.body; i++) {
    ret.push.apply(ret, exec(loopQuote));
    ret.push.apply(ret, assignVariable(n.body - i - 1, '_i'));
  }

  return ret;
}

export default {
  while: jsWord(2, 'while', whileLoop),
  times: jsWord(2, 'times', times)
};
