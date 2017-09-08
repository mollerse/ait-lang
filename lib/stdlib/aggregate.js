import { jsWord } from '../runtime/lexicon';
import {
  value,
  quotation,
  aggregate,
  assignVariable,
  assignVariableAggr,
  assignVariableEmptyAggr,
  exec,
  execWithArity,
  word
} from './utils/program';

function cons(aggr, a) {
  aggr.body.push(a);
  return aggr;
}

function swons(a, aggr) {
  aggr.body.push(a);
  return aggr;
}

function append(aggr, a) {
  aggr.body.unshift(a);
  return aggr;
}

function swappend(a, aggr) {
  aggr.body.unshift(a);
  return aggr;
}

function uncons(aggr) {
  const a = aggr.body.pop();
  return [aggr, a];
}

function unswons(aggr) {
  const a = aggr.body.pop();
  return [a, aggr];
}

function concat(b, a) {
  return aggregate((b.type == 'quotation' ? b.body : [b]).concat(a.body));
}

function enconcat(b, a, x) {
  return aggregate(b.body.concat(x, a.body));
}

function first(aggr) {
  return aggr.body[aggr.body.length - 1];
}

function last(aggr) {
  return aggr.body[0];
}

function rest(aggr) {
  aggr.body.pop();
  return aggr;
}

function of(aggr, i) {
  return aggr.body[aggr.body.length - i.body - 1];
}

function at(i, aggr) {
  return aggr.body[aggr.body.length - i.body - 1];
}

function ins(i, aggr, el) {
  aggr.body[aggr.body.length - i.body - 1] = el;
  return aggr;
}

function size(aggr) {
  return value(aggr.body.length);
}

function drop(n, aggr) {
  aggr.body.length = n.body > aggr.body.length ? 0 : aggr.body.length - n.body;
  return aggr;
}

function take(n, aggr) {
  if (n.body == 0) {
    return aggregate([]);
  }
  return aggregate(aggr.body.slice(-n.body));
}

function step(stepper, aggr) {
  const ret = [];
  for (let i = 0; i < aggr.body.length; i++) {
    ret.push.apply(ret, exec(stepper));
    ret.push(aggr.body[i]);
    ret.push.apply(ret, assignVariable(aggr.body.length - i - 1, '_i'));
  }
  ret.push.apply(ret, assignVariableAggr(aggr, '_a'));
  return ret;
}

function map(mapper, aggr) {
  const ret = [];
  for (let i = 0; i < aggr.body.length; i++) {
    ret.push(word('swappend'));
    ret.push.apply(ret, execWithArity(1, mapper));
    ret.push(aggr.body[i]);
    ret.push.apply(ret, assignVariable(aggr.body.length - i - 1, '_i'));
  }
  ret.push(aggregate([]));
  ret.push.apply(ret, assignVariableAggr(aggr, '_a'));
  return ret;
}

function map2(mapper, aggr1, aggr2) {
  const ret = [];
  for (let i = 0; i < aggr1.body.length; i++) {
    ret.push(word('swappend'));
    ret.push.apply(ret, execWithArity(2, mapper));
    ret.push(aggr1.body[i], aggr2.body[i + (aggr2.body.length - aggr1.body.length)]);
    ret.push.apply(ret, assignVariable(aggr1.body.length - i - 1, '_i'));
  }
  ret.push.apply(ret, assignVariableAggr(aggr1, '_a1'));
  ret.push.apply(ret, assignVariableAggr(aggr2, '_a2'));
  ret.push(aggregate([]));
  return ret;
}

function fold(folder, v0, aggr) {
  const ret = [];
  for (let i = 0; i < aggr.body.length; i++) {
    ret.push.apply(ret, execWithArity(2, folder));
    ret.push(aggr.body[i]);
    ret.push.apply(ret, assignVariable(aggr.body.length - i - 1, '_i'));
  }
  ret.push(v0);
  ret.push.apply(ret, assignVariableAggr(aggr, '_a'));
  return ret;
}

function sort(aggr) {
  aggr.body.sort((a, b) => b.body - a.body);
  return aggr;
}

function sortBy(prop, aggr) {
  aggr.body.sort(
    (a, b) =>
      b.body[b.body.length - prop.body - 1].body - a.body[a.body.length - prop.body - 1].body
  );
  return aggr;
}

function filter(test, aggr) {
  const ret = [];
  for (let i = 0; i < aggr.body.length; i++) {
    ret.push(word('branch'), quotation([word('pop')]), quotation([word('swappend')]));
    ret.push.apply(ret, execWithArity(0, test));
    ret.push(aggr.body[i]);
    ret.push.apply(ret, assignVariable(aggr.body.length - i - 1, '_i'));
  }
  ret.push(quotation([]));
  ret.push.apply(ret, assignVariableAggr(aggr, '_a'));
  return ret;
}

function split(test, aggr) {
  const ret = [word('_f'), word('_t')];
  for (let i = 0; i < aggr.body.length; i++) {
    ret.push(
      word('branch'),
      quotation([word('pop'), word('append'), word('_f')]),
      quotation([word('pop'), word('append'), word('_t')])
    );
    ret.push.apply(ret, execWithArity(0, test));
    ret.push(aggr.body[i]);
    ret.push.apply(ret, assignVariable(aggr.body.length - i - 1, '_i'));
  }
  ret.push.apply(ret, assignVariableEmptyAggr('_t'));
  ret.push.apply(ret, assignVariableEmptyAggr('_f'));
  ret.push.apply(ret, assignVariableAggr(aggr, '_a'));
  return ret;
}

function some(test, aggr) {
  test.body.unshift(word('||'));
  return fold(test, value(false), aggr);
}

function all(test, aggr) {
  test.body.unshift(word('&&'));
  return fold(test, value(true), aggr);
}

export default {
  cons: jsWord(2, 'cons', cons),
  swons: jsWord(2, 'swons', swons),
  append: jsWord(2, 'append', append),
  swappend: jsWord(2, 'swappend', swappend),
  uncons: jsWord(1, 'uncons', uncons),
  unswons: jsWord(1, 'unswons', unswons),
  concat: jsWord(2, 'concat', concat),
  enconcat: jsWord(3, 'enconcat', enconcat),
  first: jsWord(1, 'first', first),
  last: jsWord(1, 'last', last),
  rest: jsWord(1, 'rest', rest),
  of: jsWord(2, 'of', of),
  at: jsWord(2, 'at', at),
  ins: jsWord(3, 'ins', ins),
  size: jsWord(1, 'size', size),
  drop: jsWord(2, 'drop', drop),
  take: jsWord(2, 'take', take),
  step: jsWord(2, 'step', step),
  map: jsWord(2, 'map', map),
  map2: jsWord(3, 'map2', map2),
  fold: jsWord(3, 'fold', fold),
  sort: jsWord(1, 'sort', sort),
  sortBy: jsWord(2, 'sortBy', sortBy),
  filter: jsWord(2, 'filter', filter),
  split: jsWord(2, 'split', split),
  some: jsWord(2, 'some', some),
  all: jsWord(2, 'all', all)
};
