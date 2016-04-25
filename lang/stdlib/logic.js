var fns = require('./functions');

module.exports = {
  'true': fns.genericNullary(() => true),
  'false': fns.genericNullary(() => false),
  '>': fns.genericBinary((a, b) => a > b),
  '<': fns.genericBinary((a, b) => a < b),
  '==': fns.genericBinary((a, b) => a === b),
  '>=': fns.genericBinary((a, b) => a >= b),
  '<=': fns.genericBinary((a, b) => a <= b),
  '||': fns.genericBinary((a, b) => a || b),
  '&&': fns.genericBinary((a, b) => a && b)
};
