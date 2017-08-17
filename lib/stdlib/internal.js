import { jsWord } from '../runtime/lexicon';

function pushScope() {
  this.pushScope();
}
function popScope() {
  this.popScope();
}
function forkStack(n) {
  this.stack.fork(n.body);
}
function resolveStack() {
  this.stack.resolve();
}

export default {
  pushScope: jsWord(0, 'pushScope', pushScope),
  popScope: jsWord(0, 'popScope', popScope),
  forkStack: jsWord(1, 'forkStack', forkStack),
  resolveStack: jsWord(0, 'resolveStack', resolveStack)
};
