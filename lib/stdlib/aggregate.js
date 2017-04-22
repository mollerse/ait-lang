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
  return [[a, ...aggr]];
}

function swons(a, aggr) {
  assertAggr('swons', aggr);
  return [[a, ...aggr]];
}

function first(aggr) {
  assertAggr('first', aggr);
  assertNonEmptyAggr('first', aggr);
  const el = aggr[0];

  if(Array.isArray(el)) {
    return [el];
  }

  return el
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

  if(Array.isArray(el)) {
    return [el];
  }

  return el;
}

function ins(i, aggr, el) {
  assertAggr('ins', aggr);
  const newArray = [...aggr];
  newArray[i] = el;
  return [newArray];
}

function at(i, aggr) {
  assertAggr('at', aggr);
  assertAggrHasIndex('at', aggr, i);
  const el = aggr[i];

  if(Array.isArray(el)) {
    return [el];
  }

  return el;
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
  const newArray = [...aggr];
  const a = newArray.shift();
  return [a, newArray];
}

function unswons(aggr) {
  assertAggr('unswons', aggr);
  assertNonEmptyAggr('unswons', aggr);
  const newArray = [...aggr];
  const a = newArray.shift();
  return [newArray, a];
}

function concat(b, a) {
  assertAggr('concat', a);
  return [a.concat(b)];
}

function step(quotation, aggr) {
  assertAggr('step', aggr);
  assertQuotation('step', quotation);
  aggr.forEach(function(e) {
    this.stack.push(e);
    this.evaluateQuotation(quotation);
  }, this);
}

function map(quotation, aggr) {
  assertAggr('map', aggr);
  assertQuotation('map', quotation);
  return [
    aggr.map(function(e) {
      this.stack.push(e);
      this.evaluateQuotation(quotation, 1);
      return this.stack.pop();
    }, this)
  ];
}

function map2(quotation, aggr1, aggr2) {
  assertAggr('map2', aggr1);
  assertAggr('map2', aggr2);
  assertMinOrEqualLength('map2', aggr1, aggr2);
  assertQuotation('map2', quotation);
  return [
    aggr1.map(function(e, i) {
      this.stack.push(aggr2[i]);
      this.stack.push(e);
      this.evaluateQuotation(quotation, 2);
      return this.stack.pop();
    }, this)
  ];
}

function sort(aggr) {
  assertAggr('sort', aggr);
  return [[...aggr].sort()];
}

function sortBy(quotation, aggr) {
  assertAggr('sort', aggr);
  assertQuotation('step', quotation);

  const extractor = el => {
    this.stack.push(el);
    this.evaluateQuotation(quotation);
    return this.stack.pop();
  };

  return [[...aggr].sort((a, b) => extractor(a) - extractor(b))];
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
  map: jsword('map', map),
  map2: jsword('map2', map2),
  sort: jsword('sort', sort),
  sortBy: jsword('sortBy', sortBy)
};
