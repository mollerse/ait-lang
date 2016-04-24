var fns = require('./functions');

module.exports = {
  //CONSTANTS
  'PI': fns.genericNullary(() => Math.PI),
  'E': fns.genericNullary(() => Math.E),
  'E': fns.genericNullary(() => Math.E),
  //RANDOM
  'random': fns.genericNullary(() => Math.random()),
  //ARITHMETICS
  '*': fns.genericBinary((a,b) => a * b),
  '/': fns.genericBinary((a,b) => a / b),
  '+': fns.genericBinary((a,b) => a + b),
  '-': fns.genericBinary((a,b) => a - b),
  'mod': fns.genericBinary((a,b) => a % b),
  'neg': fns.genericUnary((a) => -a),
  'abs': fns.genericUnary((a) => Math.abs(a)),
  'max': fns.genericBinary((a, b) => Math.max(a,b)),
  'min': fns.genericBinary((a, b) => Math.min(a,b)),
  'sqrt': fns.genericUnary((a) => Math.sqrt(a)),
  'cbrt': fns.genericUnary((a) => Math.cbrt(a)),
  'pow': fns.genericBinary((a, b) => Math.pow(a,b)),
  'floor': fns.genericUnary((a) => Math.floor(a)),
  'ceil': fns.genericUnary((a) => Math.ceil(a)),
  'round': fns.genericUnary((a) => Math.round(a)),
  'exp': fns.genericUnary((a) => Math.exp(a)),
  'sign': fns.genericUnary((a) => Math.sign(a)),
  'log': fns.genericUnary((a) => Math.log(a)),
  'log10': fns.genericUnary((a) => Math.log10(a)),
  //TRIGONOMETRY
  'cos': fns.genericUnary((a) => Math.cos(a)),
  'acos': fns.genericUnary((a) => Math.acos(a)),
  'cosh': fns.genericUnary((a) => Math.cosh(a)),
  'acosh': fns.genericUnary((a) => Math.acosh(a)),
  'sin': fns.genericUnary((a) => Math.sin(a)),
  'asin': fns.genericUnary((a) => Math.asin(a)),
  'sinh': fns.genericUnary((a) => Math.sinh(a)),
  'asinh': fns.genericUnary((a) => Math.asinh(a)),
  'tan': fns.genericUnary((a) => Math.tan(a)),
  'atan': fns.genericUnary((a) => Math.atan(a)),
  'atan2': fns.genericUnary((a) => Math.atan2(a)),
  'tanh': fns.genericUnary((a) => Math.tanh(a)),
  'atanh': fns.genericUnary((a) => Math.atanh(a)),
};
