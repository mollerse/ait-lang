import jsword from '../runtime/jsword';

module.exports = {
  // CONSTANTS
  PI: jsword('PI', () => Math.PI),
  E: jsword('E', () => Math.E),
  // RANDOM
  random: jsword('random', () => Math.random()),
  random2: jsword(
    'random2',
    (upper, lower) => lower + Math.random() * (upper - lower)
  ),
  // ARITHMETICS
  '*': jsword('*', (b, a) => a * b),
  '/': jsword('/', (b, a) => a / b),
  '+': jsword('+', (b, a) => a + b),
  '-': jsword('-', (b, a) => a - b),
  mod: jsword('mod', (b, a) => a % b),
  neg: jsword('neg', a => -a),
  abs: jsword('abs', a => Math.abs(a)),
  max: jsword('max', (b, a) => Math.max(a, b)),
  min: jsword('min', (b, a) => Math.min(a, b)),
  sqrt: jsword('sqrt', a => Math.sqrt(a)),
  cbrt: jsword('cbrt', a => Math.cbrt(a)),
  pow: jsword('pow', (b, a) => Math.pow(a, b)),
  floor: jsword('floor', a => Math.floor(a)),
  ceil: jsword('ceil', a => Math.ceil(a)),
  round: jsword('round', a => Math.round(a)),
  exp: jsword('exp', a => Math.exp(a)),
  sign: jsword('sign', a => Math.sign(a)),
  log: jsword('log', a => Math.log(a)),
  log10: jsword('log10', a => Math.log10(a)),
  // TRIGONOMETRY
  cos: jsword('cos', a => Math.cos(a)),
  acos: jsword('acos', a => Math.acos(a)),
  cosh: jsword('cosh', a => Math.cosh(a)),
  acosh: jsword('acosh', a => Math.acosh(a)),
  sin: jsword('sin', a => Math.sin(a)),
  asin: jsword('asin', a => Math.asin(a)),
  sinh: jsword('sinh', a => Math.sinh(a)),
  asinh: jsword('asinh', a => Math.asinh(a)),
  tan: jsword('tan', a => Math.tan(a)),
  atan: jsword('atan', a => Math.atan(a)),
  atan2: jsword('atan2', (b, a) => Math.atan2(a, b)),
  tanh: jsword('tanh', a => Math.tanh(a)),
  atanh: jsword('atanh', a => Math.atanh(a))
};
