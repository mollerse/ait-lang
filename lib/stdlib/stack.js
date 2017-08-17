import clone from 'clone';
import { jsWord } from '../runtime/lexicon';
import { prettyPrint } from '../parser/ast-walkers';
import { quotation } from './utils/program';

const pop = _ => {}; // eslint-disable-line no-unused-vars
const popd = (a, _) => a; // eslint-disable-line no-unused-vars
const swap = (a, b) => [b, a];
const swapd = (z, a, b) => [z, b, a];
const rollup = (a, b, c) => [c, a, b];
const rollupd = (z, a, b, c) => [z, c, a, b];
const rolldown = (a, b, c) => [b, c, a];
const rolldownd = (z, a, b, c) => [z, b, c, a];
const rotate = (a, b, c) => [c, b, a];
const rotated = (z, a, b, c) => [z, c, b, a];

function dup(top) {
  if (top.type == 'quotation') {
    // We have to clone the body to avoid accidental shared state
    return [clone(top), top];
  }

  return [top, top];
}

function dupd(a, b) {
  if (b.type == 'quotation') {
    // We have to clone the body to avoid accidental shared state
    return [a, b, clone(b)];
  }

  return [a, b, b];
}

function unstack(newStack) {
  this.unstack(newStack.body);
}

function stack() {
  // This has to be a copy, otherwise it will contain itself
  return quotation(clone(this.stack.stack(), false).reverse());
}

const dot = top => console.log(prettyPrint(top));

export default {
  '.': jsWord(1, '.', dot),
  dup: jsWord(1, 'dup', dup),
  dupd: jsWord(2, 'dupd', dupd),
  pop: jsWord(1, 'pop', pop),
  popd: jsWord(2, 'popd', popd),
  swap: jsWord(2, 'swap', swap),
  swapd: jsWord(3, 'swapd', swapd),
  rollup: jsWord(3, 'rollup', rollup),
  rollupd: jsWord(4, 'rollupd', rollupd),
  rolldown: jsWord(3, 'rolldown', rolldown),
  rolldownd: jsWord(4, 'rolldownd', rolldownd),
  rotate: jsWord(3, 'rotate', rotate),
  rotated: jsWord(4, 'rotated', rotated),
  stack: jsWord(0, 'stack', stack),
  unstack: jsWord(1, 'unstack', unstack)
};
