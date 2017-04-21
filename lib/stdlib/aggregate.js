import jsword from '../runtime/jsword';

function cons(aggr, a) {
  return [[a, ...aggr]];
}

function swons(a, aggr) {
  return [[a, ...aggr]];
}

function first(aggr) {
  return aggr[0];
}

function rest(aggr) {
  return [aggr.slice(1)];
}

function of(aggr, i) {
  return aggr[i];
}

function ins(i, aggr, el) {
  aggr[i] = el;
  return [[...aggr]];
}

function at(i, aggr) {
  return aggr[i];
}

function size(aggr) {
  return aggr.length;
}

function drop(n, aggr) {
  return [aggr.slice(n)];
}

function take(n, aggr) {
  return [aggr.slice(0, n)];
}

function uncons(aggr) {
  const a = aggr.shift();
  return [a, [...aggr]];
}

function unswons(aggr) {
  const a = aggr.shift();
  return [[...aggr], a];
}

function concat(b, a) {
  return [a.concat(b)];
}

function step(quotation, aggr) {
  aggr.forEach(function(e) {
    this.stack.push(e);
    this.evaluateQuotation(quotation);
  }, this);
}

function map(quotation, aggr) {
  return [
    aggr.map(function(e) {
      this.stack.push(e);
      this.evaluateQuotation(quotation);
      return this.stack.pop();
    }, this)
  ];
}

export default {
  uncons: jsword('uncons', uncons),
  unswons: jsword('unswons', unswons),
  concat: jsword('concat', concat),
  cons: jsword('cons', cons),
  swons: jsword('swons', swons),
  first: jsword('first', first),
  rest: jsword('rest', rest),
  at: jsword('at', at),
  ins: jsword('ins', ins),
  of: jsword('of', of),
  size: jsword('size', size),
  drop: jsword('drop', drop),
  take: jsword('take', take),
  step: jsword('step', step),
  map: jsword('map', map)
};
