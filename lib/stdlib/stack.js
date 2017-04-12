import jsword from '../runtime/jsword';

const pop = jsword('pop', _ => {}); // eslint-disable-line no-unused-vars

const swap = jsword('swap', (a, b) => [a, b]);

const dot = jsword('.', top => console.log(top));

const dup = jsword('dup', top => [top, top]);

const unstack = jsword('unstack', function(newStack) {
  this.unstack(newStack);
});

const stack = jsword('stack', function() {
  return [this.stack.stack()];
});

const dip = jsword('dip', function(q, top) {
  this.evaluateQuotation(q);

  return top;
});

module.exports = {
  '.': dot,
  dup,
  swap,
  pop,
  stack,
  unstack,
  dip
};
