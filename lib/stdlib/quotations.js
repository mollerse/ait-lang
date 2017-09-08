import { jsWord } from '../runtime/lexicon';
import { execWithArity, word, quotation, exec } from './utils/program';

function _exec(quotation) {
  return exec(quotation);
}

function nullary(quotation) {
  return execWithArity(0, quotation);
}

function unary(quotation) {
  return execWithArity(1, quotation);
}

function binary(quotation) {
  return execWithArity(2, quotation);
}

function ternary(quotation) {
  return execWithArity(3, quotation);
}

function dip(q, top) {
  const ret = [top];
  ret.push.apply(ret, exec(q));
  return ret;
}

function cleave(q2, q1, top) {
  const ret = [word('dip')];
  const inner = [];
  inner.push.apply(inner, exec(q1));
  inner.push(top);
  ret.push(quotation(inner));
  ret.push.apply(ret, exec(q2));
  ret.push(top);

  return ret;
}

export default {
  exec: jsWord(1, 'exec', _exec),
  nullary: jsWord(1, 'nullary', nullary),
  unary: jsWord(1, 'unary', unary),
  binary: jsWord(1, 'binary', binary),
  ternary: jsWord(1, 'ternary', ternary),
  dip: jsWord(2, 'dip', dip),
  cleave: jsWord(3, 'cleave', cleave)
};
