import { jsWord } from '../runtime/lexicon';
import { value } from './utils/program';

export default {
  // CONSTANTS
  PI: jsWord(0, 'PI', () => value(Math.PI)),
  E: jsWord(0, 'E', () => value(Math.E)),
  // RANDOM
  random: jsWord(0, 'random', () => value(Math.random())),
  random2: jsWord(2, 'random2', (upper, lower) =>
    value(lower.body + Math.random() * (upper.body - lower.body))
  ),
  // ARITHMETICS
  '*': jsWord(2, '*', (b, a) => value(a.body * b.body)),
  '/': jsWord(2, '/', (b, a) => value(a.body / b.body)),
  '+': jsWord(2, '+', (b, a) => value(a.body + b.body)),
  '-': jsWord(2, '-', (b, a) => value(a.body - b.body)),
  mod: jsWord(2, 'mod', (b, a) => value(a.body % b.body)),
  neg: jsWord(1, 'neg', a => value(-a.body)),
  abs: jsWord(1, 'abs', a => value(Math.abs(a.body))),
  max: jsWord(2, 'max', (b, a) => value(Math.max(a.body, b.body))),
  min: jsWord(2, 'min', (b, a) => value(Math.min(a.body, b.body))),
  sqrt: jsWord(1, 'sqrt', a => value(Math.sqrt(a.body))),
  cbrt: jsWord(1, 'cbrt', a => value(Math.cbrt(a.body))),
  pow: jsWord(2, 'pow', (b, a) => value(Math.pow(a.body, b.body))),
  floor: jsWord(1, 'floor', a => value(Math.floor(a.body))),
  ceil: jsWord(1, 'ceil', a => value(Math.ceil(a.body))),
  round: jsWord(1, 'round', a => value(Math.round(a.body))),
  exp: jsWord(1, 'exp', a => value(Math.exp(a.body))),
  sign: jsWord(1, 'sign', a => value(Math.sign(a.body))),
  log: jsWord(1, 'log', a => value(Math.log(a.body))),
  log10: jsWord(1, 'log10', a => value(Math.log10(a.body))),
  // TRIGONOMETRY
  cos: jsWord(1, 'cos', a => value(Math.cos(a.body))),
  acos: jsWord(1, 'acos', a => value(Math.acos(a.body))),
  cosh: jsWord(1, 'cosh', a => value(Math.cosh(a.body))),
  acosh: jsWord(1, 'acosh', a => value(Math.acosh(a.body))),
  sin: jsWord(1, 'sin', a => value(Math.sin(a.body))),
  asin: jsWord(1, 'asin', a => value(Math.asin(a.body))),
  sinh: jsWord(1, 'sinh', a => value(Math.sinh(a.body))),
  asinh: jsWord(1, 'asinh', a => value(Math.asinh(a.body))),
  tan: jsWord(1, 'tan', a => value(Math.tan(a.body))),
  atan: jsWord(1, 'atan', a => value(Math.atan(a.body))),
  atan2: jsWord(2, 'atan2', (b, a) => value(Math.atan2(a.body, b.body))),
  tanh: jsWord(1, 'tanh', a => value(Math.tanh(a.body))),
  atanh: jsWord(1, 'atanh', a => value(Math.atanh(a.body))),
  // Specials
  succ: jsWord(1, 'succ', a => value(a.body + 1)),
  pred: jsWord(1, 'pred', a => value(a.body - 1))
};
