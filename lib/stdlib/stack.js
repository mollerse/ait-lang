import jsword from '../runtime/jsword';

const drop = jsword((_) => {}, 'drop'); // eslint-disable-line no-unused-vars

const swap = jsword((a, b) => [a, b], 'swap');

const dot = jsword(top => console.log(top), '.');

const dup = jsword(top => [top, top], 'dup');

const unstack = jsword(function() {
  this.unstack();
}, 'unstack');

const stack = jsword(function() {
  return [[...this.stack]];
}, 'stack');

const dip = jsword(function(q, top) {
  this.evaluateQuotation(q);

  return top;
}, 'dip');

const exec = jsword(function(q) {
  this.evaluateQuotation(q);
}, 'exec');

module.exports = {
  '.': dot,
  dup,
  swap,
  drop,
  stack,
  unstack,
  dip,
  exec
};
