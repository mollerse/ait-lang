// @flow

import type {
  EvaluatedWord,
  EvaluatedValue,
  Module,
  AitWord,
  JSFunction,
  EvaluatedQuotation
} from '../evaluator/evaluate';
import evaluate from '../evaluator/evaluate';
import parse from '../parser/parse';

// Alias for module
type Lexicon = Module;

export type BrowserRuntime = {
  lexicon: Lexicon,
  stack: Array<EvaluatedValue>,
  load: (modules: Module) => void,
  evaluateInScope: (word: EvaluatedWord) => void,
  evaluateQuotation: (quotation: EvaluatedQuotation) => void,
  pushOnStack: (value: EvaluatedValue) => void,
  type: 'browser'
}

export type NodeRuntime = {
  lexicon: Lexicon,
  stack: Array<EvaluatedValue>,
  load: (modules: Module) => void,
  evaluateInScope: (word: EvaluatedWord) => void,
  evaluateQuotation: (quotation: EvaluatedQuotation) => void,
  pushOnStack: (value: EvaluatedValue) => void,
  type: 'node',
  root: string
}

export type Runtime = BrowserRuntime | NodeRuntime;

export const runtime = {

  load(module: Module) {
    Object.assign(this.lexicon, module);
  },

  evaluateInScope(w: EvaluatedWord) {
    if (w.type === 'ait') {
      exec(w, this);
    } else {
      call(w, this);
    }
  },

  evaluateQuotation(quotation: EvaluatedQuotation) {
    exec({ type: 'ait', fn: quotation, name: 'quotation' }, this);
  },

  pushOnStack(v: EvaluatedValue) {
    this.stack.push(v);
  },

  unstack() {
    this.stack = [];
  },

  baseReset() {
    this.unstack();
    this.lexicon = {};
  },

  evaluate(source: string) {
    const src = parse(source);
    if(src) {
      evaluate(src, this);
    }
  }
};

function exec(word: AitWord, r: Runtime) {
  word.fn.forEach(function(el) {
    if (typeof el === 'string' || typeof el === 'boolean' || typeof el === 'number' || Array.isArray(el)) {
      r.pushOnStack(el);
    } else if (el.type && (el.type === 'js' || el.type === 'ait')) {
      r.evaluateInScope(el);
    } else {
      r.pushOnStack(el);
    }
  });
}

function call(word: JSFunction, r: Runtime) {
  const numberOfArgs = word.fn.length;
  const args = [];
  for (let i = 0; i < numberOfArgs; i += 1) {
    args.push(r.stack.pop());
  }
  const res = word.fn.apply(r, args);
  if (Array.isArray(res)) {
    res.forEach(v => r.pushOnStack(v));
  } else if (res != null) {
    r.pushOnStack(res);
  }
}
