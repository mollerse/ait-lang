import jsword from '../runtime/jsword';
import { assertAggr, assertNonEmptyAggr, assertAggrHasIndex, assertQuotation } from './assertions';


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
  return aggr[0];
}

function rest(aggr) {
  assertAggr('rest', aggr);
  assertNonEmptyAggr('rest', aggr);
  return [aggr.slice(1)];
}

function of(aggr, i) {
  assertAggr('of', aggr);
  return aggr[i];
}

function ins(i, aggr, el) {
  assertAggr('ins', aggr);
  aggr[i] = el;
  return [[...aggr]];
}

function at(i, aggr) {
  assertAggr('at', aggr);
  assertAggrHasIndex('at', aggr, i);
  return aggr[i];
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
  return [a, [...aggr]];
}

function unswons(aggr) {
  assertAggr('unswons', aggr);
  assertNonEmptyAggr('unswons', aggr);
  const a = aggr.shift();
  return [[...aggr], a];
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
  assertQuotation('step', quotation);
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
