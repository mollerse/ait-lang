const copy = require('lodash.clonedeep');

const {nullary, binary, JSWord} = require('../runtime/interfaces');

const drop = JSWord(top => {});
drop.produces(0);

const swap = JSWord((a,b) => [a,b]);
swap.produces(2);

const dot = JSWord(top => console.log(top));
dot.produces(0);

const dup = JSWord(top => [top, copy(top)]);
dup.produces(2);

const unstack = JSWord(function() {
  const context = arguments[arguments.length - 1];
  context.stack.unstack();
});
unstack.produces(0);

module.exports = {
  '.': dot,
  dup,
  swap,
  drop,
  stack: nullary(function() {
    const {stack} = arguments[arguments.length - 1];

    return stack.stack();
  }),
  dip: binary(function(top, quote) {
    quote.evaluate();

    return top;
  }),
  unstack
};
