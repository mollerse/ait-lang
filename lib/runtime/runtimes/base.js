const stack = require('../stack');
const evaluate = require('../evaluate');
const stdlib = require('../../stdlib');
const parse = require('../../parser/parse');

class BaseRuntime {
  constructor() {
    this.stack = stack();
    this.lexicon = stdlib;
  }

  loadWords(words) {
    this.lexicon = Object.assign(this.lexicon, words);
  }

  reset() {
    this.stack.unstack();
    this.lexicon = stdlib;
  }

  evaluate(source) {
    const ast = parse(source);

    if(ast == null) {
      throw new Error('Parse error!');
    }

    evaluate(ast, this);
  }
}

module.exports = BaseRuntime;
