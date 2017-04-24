import jsword from '../runtime/jsword';

const pop = jsword('pop', _ => {}); // eslint-disable-line no-unused-vars

const swap = jsword('swap', (a, b) => [a, b]);

const dot = jsword('.', top => console.log(JSON.stringify(top, null, 2)));

const dup = jsword('dup', function(top) {
  if (Array.isArray(top)) {
    return [top, [...top]];
  }

  return [top, top];
});

const unstack = jsword('unstack', function(newStack) {
  this.unstack(newStack);
});

const stack = jsword('stack', function() {
  return [this.stack.stack()];
});

const dip = jsword('dip', function(q, top) {
  this.evaluateQuotation(q);

  if (Array.isArray(top)) {
    return [top];
  }

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
