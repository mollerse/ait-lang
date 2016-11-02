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

function at(aggr, i) {
  return aggr[i];
}

function of(i, aggr) {
  return aggr[i];
}

function size(aggr) {
  return aggr.length;
}

function drop(aggr, n) {
  return [aggr.slice(n)];
}

function take(aggr, n) {
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
  return a.concat(b);
}

function step(quotation, aggr) {
  aggr.forEach(function(e) {
    this.stack.push(e);
    this.evaluateQuotation(quotation);
  }, this);
}

function map(quotation, aggr) {
  return [aggr.map(function(e) {
    this.stack.push(e);
    this.evaluateQuotation(quotation);
    return this.stack.pop();
  }, this)];
}

function sort(propQuotation, aggr) {
  const extractor = el => {
    this.stack.push(el);
    this.evaluateQuotation(propQuotation);
    return this.stack.pop();
  };

  return [aggr.sort(function(a, b) {
    return extractor(a) - extractor(b);
  })];
}

export default {
  uncons: jsword(uncons,'uncons'),
  unswons: jsword(unswons,'unswons'),
  concat: jsword(concat,'concat'),
  cons: jsword(cons, 'cons'),
  swons: jsword(swons, 'swons'),
  first: jsword(first, 'first'),
  rest: jsword(rest, 'rest'),
  at: jsword(at, 'at'),
  of: jsword(of, 'of'),
  size: jsword(size, 'size'),
  drop: jsword(drop, 'drop'),
  take: jsword(take, 'take'),
  step: jsword(step, 'step'),
  map: jsword(map, 'map'),
  sort: jsword(sort, 'sort')
};
