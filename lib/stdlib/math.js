import jsword from '../runtime/jsword';

module.exports = {
  // CONSTANTS
  PI: jsword(() => Math.PI, 'PI'),
  E: jsword(() => Math.E, 'E'),
  // RANDOM
  random: jsword(() => Math.random(), 'random'),
  // ARITHMETICS
  '*': jsword((b, a) => a * b, '*'),
  '/': jsword((b, a) => a / b, '/'),
  '+': jsword((b, a) => a + b, '+'),
  '-': jsword((b, a) => a - b, '-'),
  mod: jsword((b, a) => a % b, 'mod'),
  neg: jsword(a => -a, 'neg'),
  abs: jsword(a => Math.abs(a), 'abs'),
  max: jsword((b, a) => Math.max(a, b), 'max'),
  min: jsword((b, a) => Math.min(a, b), 'min'),
  sqrt: jsword(a => Math.sqrt(a), 'sqrt'),
  cbrt: jsword(a => Math.cbrt(a), 'cbrt'),
  pow: jsword((b, a) => Math.pow(a, b), 'pow'),
  floor: jsword(a => Math.floor(a), 'floor'),
  ceil: jsword(a => Math.ceil(a), 'ceil'),
  round: jsword(a => Math.round(a), 'round'),
  exp: jsword(a => Math.exp(a), 'exp'),
  sign: jsword(a => Math.sign(a), 'sign'),
  log: jsword(a => Math.log(a), 'log'),
  log10: jsword(a => Math.log10(a), 'log10'),
  // TRIGONOMETRY
  cos: jsword(a => Math.cos(a), 'cos'),
  acos: jsword(a => Math.acos(a), 'acos'),
  cosh: jsword(a => Math.cosh(a), 'cosh'),
  acosh: jsword(a => Math.acosh(a), 'acosh'),
  sin: jsword(a => Math.sin(a), 'sin'),
  asin: jsword(a => Math.asin(a), 'asin'),
  sinh: jsword(a => Math.sinh(a), 'sinh'),
  asinh: jsword(a => Math.asinh(a), 'asinh'),
  tan: jsword(a => Math.tan(a), 'tan'),
  atan: jsword(a => Math.atan(a), 'atan'),
  atan2: jsword(a => Math.atan2(a), 'atan2'),
  tanh: jsword(a => Math.tanh(a), 'tanh'),
  atanh: jsword(a => Math.atanh(a), 'atanh'),
};
