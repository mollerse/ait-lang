const {
  nullary,
  binary
} = require('../runtime/interfaces');

module.exports = {
  'true': nullary(() => true),
  'false': nullary(() => false),
  '>': binary((a, b) => a > b),
  '<': binary((a, b) => a < b),
  '==': binary((a, b) => a === b),
  '>=': binary((a, b) => a >= b),
  '<=': binary((a, b) => a <= b),
  '||': binary((a, b) => a || b),
  '&&': binary((a, b) => a && b)
};
