// @flow

import type { Stack, Lexicon } from './types';
import { populateLexicon, evaluateValue } from './evaluate';
import parse from '../parser/parse';
import stackFactory from './stack';
import stdlib from '../stdlib';

export default class BaseRuntime {
  stack: Stack;
  lexicon: Lexicon;

  constructor() {
    this.stack = stackFactory();
    this.lexicon = stdlib;
  }

  unstack(newStack: Array<mixed>) {
    if (!Array.isArray(newStack)) {
      throw new Error('Aggregate is required for unstack');
    }
    this.stack.restack(newStack);
  }

  reset() {
    this.unstack([]);
    this.lexicon = stdlib;
  }

  load(module: Lexicon) {
    Object.assign(this.lexicon, module);
  }

  evaluateQuotation(quotation: Array<mixed>, arity: ?number) {
    if (!Array.isArray(quotation)) {
      throw new Error(`Cannot evaluate primitive ${quotation}`);
    }
    if (arity != null) {
      executeProgramWithArity([...quotation], this, arity);
    } else {
      executeProgram([...quotation], this);
    }
  }

  evaluate(source: string) {
    const src = parse(source);

    if (!Array.isArray(src)) {
      throw new Error(src.cause);
    }

    const definedLexicon = populateLexicon(src, this);

    if (definedLexicon.type === 'aitFault') {
      throw new Error(definedLexicon.cause);
    }

    Object.assign(this.lexicon, definedLexicon);

    let program = src.reduce(function(acc, n) {
      if (
        n.type === 'quotation' || n.type === 'primitive' || n.type === 'word'
      ) {
        acc.push(evaluateValue(n));
      }
      return acc;
    }, []);

    executeProgram(program, this);
  }
}

function executeProgramWithArity(program: Array<mixed>, runtime, arity) {
  runtime.stack.fork(arity);
  executeProgram(program, runtime);
  runtime.stack.resolve();
}

function executeProgram(program: Array<mixed>, runtime: BaseRuntime) {
  while (program.length > 0) {
    const current = program.shift();

    if (typeof current === 'boolean' || typeof current === 'number') {
      runtime.stack.push(current);
      continue;
    } else if (Array.isArray(current)) {
      runtime.stack.push([...current]);
      continue;
    }

    const wordDefiniton = runtime.lexicon[current];

    if (!wordDefiniton) {
      // Assume its a string
      runtime.stack.push(current);
      continue;
    } else if (wordDefiniton.type === 'ait') {
      //Prepend the definition to the current program
      program = wordDefiniton.fn.concat(program);
      continue;
    } else if (wordDefiniton.type === 'js') {
      let args = [];
      for (let i = 0; i < wordDefiniton.fn.length; i++) {
        args.push(runtime.stack.pop());
      }

      const res = wordDefiniton.fn.apply(runtime, args);

      if (Array.isArray(res)) {
        res.forEach(v => runtime.stack.push(v));
      } else if (res != null) {
        runtime.stack.push(res);
      }
      continue;
    }
  }
}
