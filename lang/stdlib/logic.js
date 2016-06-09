const {
  genericNullary,
  genericBinary
} = require('./functions');

module.exports = {
  'true': genericNullary(() => true),
  'false': genericNullary(() => false),
  '>': genericBinary((a, b) => a > b),
  '<': genericBinary((a, b) => a < b),
  '==': genericBinary((a, b) => a === b),
  '>=': genericBinary((a, b) => a >= b),
  '<=': genericBinary((a, b) => a <= b),
  '||': genericBinary((a, b) => a || b),
  '&&': genericBinary((a, b) => a && b)
};
