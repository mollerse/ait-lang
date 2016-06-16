const {
  nullary,
  unary,
  binary
} = require('../runtime/interfaces');

module.exports = {
  //CONSTANTS
  'PI': nullary(() => Math.PI),
  'E': nullary(() => Math.E),
  'E': nullary(() => Math.E),
  //RANDOM
  'random': nullary(() => Math.random()),
  //ARITHMETICS
  '*': binary((a,b) => a * b),
  '/': binary((a,b) => a / b),
  '+': binary((a,b) => a + b),
  '-': binary((a,b) => a - b),
  'mod': binary((a,b) => a % b),
  'neg': unary((a) => -a),
  'abs': unary((a) => Math.abs(a)),
  'max': binary((a,b) => Math.max(a,b)),
  'min': binary((a,b) => Math.min(a,b)),
  'sqrt': unary((a) => Math.sqrt(a)),
  'cbrt': unary((a) => Math.cbrt(a)),
  'pow': binary((a,b) => Math.pow(a,b)),
  'floor': unary((a) => Math.floor(a)),
  'ceil': unary((a) => Math.ceil(a)),
  'round': unary((a) => Math.round(a)),
  'exp': unary((a) => Math.exp(a)),
  'sign': unary((a) => Math.sign(a)),
  'log': unary((a) => Math.log(a)),
  'log10': unary((a) => Math.log10(a)),
  //TRIGONOMETRY
  'cos': unary((a) => Math.cos(a)),
  'acos': unary((a) => Math.acos(a)),
  'cosh': unary((a) => Math.cosh(a)),
  'acosh': unary((a) => Math.acosh(a)),
  'sin': unary((a) => Math.sin(a)),
  'asin': unary((a) => Math.asin(a)),
  'sinh': unary((a) => Math.sinh(a)),
  'asinh': unary((a) => Math.asinh(a)),
  'tan': unary((a) => Math.tan(a)),
  'atan': unary((a) => Math.atan(a)),
  'atan2': unary((a) => Math.atan2(a)),
  'tanh': unary((a) => Math.tanh(a)),
  'atanh': unary((a) => Math.atanh(a)),
};
