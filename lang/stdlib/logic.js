var fns = require('./functions');

module.exports = {
  '>': fns.genericBinary((a, b) => a > b),
  '<': fns.genericBinary((a, b) => a < b),
  '==': fns.genericBinary((a, b) => a === b),
  '>=': fns.genericBinary((a, b) => a >= b),
  '<=': fns.genericBinary((a, b) => a <= b),
  '||': fns.genericBinary((a, b) => a || b),
  '&&': fns.genericBinary((a, b) => a && b)
};
