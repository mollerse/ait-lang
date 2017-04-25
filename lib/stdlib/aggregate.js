import jsword from '../runtime/jsword';
import {
  assertAggr,
  assertNonEmptyAggr,
  assertAggrHasIndex,
  assertQuotation,
  assertMinOrEqualLength
} from './assertions';

function cons(aggr, a) {
  assertAggr('cons', aggr);
  aggr.unshift(a);
  return [aggr];
}

function swons(a, aggr) {
  assertAggr('swons', aggr);
  aggr.unshift(a);
  return [aggr];
}

function append(aggr, a) {
  assertAggr('append', aggr);
  aggr.push(a);
  return [aggr];
}

function swappend(a, aggr) {
  assertAggr('swappend', aggr);
  aggr.push(a);
  return [aggr];
}

function first(aggr) {
  assertAggr('first', aggr);
  assertNonEmptyAggr('first', aggr);
  const el = aggr[0];

  return [aggr, el];
}

function last(aggr) {
  assertAggr('last', aggr);
  assertNonEmptyAggr('last', aggr);
  const el = aggr[aggr.length - 1];

  return [aggr, el];
}

function rest(aggr) {
  assertAggr('rest', aggr);
  assertNonEmptyAggr('rest', aggr);
  return [aggr.slice(1)];
}

function of(aggr, i) {
  assertAggr('of', aggr);
  assertAggrHasIndex('of', aggr, i);
  const el = aggr[i];

  return [aggr, el];
}

function ins(i, aggr, el) {
  assertAggr('ins', aggr);
  aggr[i] = el;
  return [aggr];
}

function at(i, aggr) {
  assertAggr('at', aggr);
  assertAggrHasIndex('at', aggr, i);
  const el = aggr[i];

  return [aggr, el];
}

function size(aggr) {
  assertAggr('size', aggr);
  return aggr.length;
}

function drop(n, aggr) {
  assertAggr('drop', aggr);
  return [aggr.slice(n)];
}

function take(n, aggr) {
  assertAggr('take', aggr);
  return [aggr.slice(0, n)];
}

function uncons(aggr) {
  assertAggr('uncons', aggr);
  assertNonEmptyAggr('uncons', aggr);
  const a = aggr.shift();
  return [a, aggr];
}

function unswons(aggr) {
  assertAggr('unswons', aggr);
  assertNonEmptyAggr('unswons', aggr);
  const a = aggr.shift();
  return [aggr, a];
}

function concat(b, a) {
  assertAggr('concat', a);
  return [a.concat(b)];
}

function step(quotation, aggr) {
  assertAggr('step', aggr);
  assertQuotation('step', quotation);
  aggr.forEach(e => {
    this.stack.push(e);
    this.evaluateQuotation(quotation);
  });
}

function map(quotation, aggr) {
  assertAggr('map', aggr);
  assertQuotation('map', quotation);
  return [
    aggr.map(e => {
      this.stack.push(e);
      this.evaluateQuotation(quotation, 1);
      return this.stack.pop();
    })
  ];
}

function map2(quotation, aggr1, aggr2) {
  assertAggr('map2', aggr1);
  assertAggr('map2', aggr2);
  assertMinOrEqualLength('map2', aggr1, aggr2);
  assertQuotation('map2', quotation);
  return [
    aggr1.map((e, i) => {
      this.stack.push(aggr2[i]);
      this.stack.push(e);
      this.evaluateQuotation(quotation, 2);
      return this.stack.pop();
    })
  ];
}

function fold(quotation, v0, aggr) {
  assertAggr('fold', aggr);
  assertQuotation('fold', quotation);
  return [
    aggr.reduce((acc, e) => {
      this.stack.push(acc);
      this.stack.push(e);
      this.evaluateQuotation(quotation, 2);
      return this.stack.pop();
    }, v0)
  ];
}

function sort(aggr) {
  assertAggr('sort', aggr);
  return [aggr.sort()];
}

function sortBy(quotation, aggr) {
  assertAggr('sort', aggr);
  assertQuotation('step', quotation);

  const extractor = el => {
    this.stack.push(el);
    this.evaluateQuotation(quotation, 1);
    return this.stack.pop();
  };

  return [aggr.sort((a, b) => extractor(a) - extractor(b))];
}

export default {
  uncons: jsword('uncons', uncons),
  unswons: jsword('unswons', unswons),
  concat: jsword('concat', concat),
  cons: jsword('cons', cons),
  swons: jsword('swons', swons),
  append: jsword('append', append),
  swappend: jsword('swappend', swappend),
  first: jsword('first', first),
  last: jsword('last', last),
  rest: jsword('rest', rest),
  at: jsword('at', at),
  ins: jsword('ins', ins),
  of: jsword('of', of),
  size: jsword('size', size),
  drop: jsword('drop', drop),
  take: jsword('take', take),
  step: jsword('step', step),
  map: jsword('map', map),
  map2: jsword('map2', map2),
  fold: jsword('fold', fold),
  sort: jsword('sort', sort),
  sortBy: jsword('sortBy', sortBy)
};
