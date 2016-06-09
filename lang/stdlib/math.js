const {
  genericNullary,
  genericUnary,
  genericBinary
} = require('./functions');

module.exports = {
  //CONSTANTS
  'PI': genericNullary(() => Math.PI),
  'E': genericNullary(() => Math.E),
  'E': genericNullary(() => Math.E),
  //RANDOM
  'random': genericNullary(() => Math.random()),
  //ARITHMETICS
  '*': genericBinary((a,b) => a * b),
  '/': genericBinary((a,b) => a / b),
  '+': genericBinary((a,b) => a + b),
  '-': genericBinary((a,b) => a - b),
  'mod': genericBinary((a,b) => a % b),
  'neg': genericUnary((a) => -a),
  'abs': genericUnary((a) => Math.abs(a)),
  'max': genericBinary((a, b) => Math.max(a,b)),
  'min': genericBinary((a, b) => Math.min(a,b)),
  'sqrt': genericUnary((a) => Math.sqrt(a)),
  'cbrt': genericUnary((a) => Math.cbrt(a)),
  'pow': genericBinary((a, b) => Math.pow(a,b)),
  'floor': genericUnary((a) => Math.floor(a)),
  'ceil': genericUnary((a) => Math.ceil(a)),
  'round': genericUnary((a) => Math.round(a)),
  'exp': genericUnary((a) => Math.exp(a)),
  'sign': genericUnary((a) => Math.sign(a)),
  'log': genericUnary((a) => Math.log(a)),
  'log10': genericUnary((a) => Math.log10(a)),
  //TRIGONOMETRY
  'cos': genericUnary((a) => Math.cos(a)),
  'acos': genericUnary((a) => Math.acos(a)),
  'cosh': genericUnary((a) => Math.cosh(a)),
  'acosh': genericUnary((a) => Math.acosh(a)),
  'sin': genericUnary((a) => Math.sin(a)),
  'asin': genericUnary((a) => Math.asin(a)),
  'sinh': genericUnary((a) => Math.sinh(a)),
  'asinh': genericUnary((a) => Math.asinh(a)),
  'tan': genericUnary((a) => Math.tan(a)),
  'atan': genericUnary((a) => Math.atan(a)),
  'atan2': genericUnary((a) => Math.atan2(a)),
  'tanh': genericUnary((a) => Math.tanh(a)),
  'atanh': genericUnary((a) => Math.atanh(a)),
};
