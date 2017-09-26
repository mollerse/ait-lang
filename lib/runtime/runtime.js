// @flow
import clone from 'clone';
import type { Stack } from './stack';
import type { Lexicon, JSWord } from './lexicon';
import type { Value, Word } from '../parser/ast';

import { lexicon, populateLexicon } from './lexicon';
import {
  findLoadDirectives,
  findValues,
  isBool,
  isNumber,
  isString,
  isQuotation,
  isVar,
  isGlobalVar,
  isWord,
  isAitValue
} from '../parser/ast-walkers';
import parse from '../parser/parse';
import stackFactory from './stack';

export interface Runtime {
  type: string,
  stack: Stack,
  scope: Object,
  rootScope: Object,
  lexicon: Lexicon,
  reset(): void,
  loadModule(name: string): void,
  unstack(newStack: Array<mixed>): void,
  pushScope(): void,
  popScope(): void,
  evaluate(src: string): void
}

export default class BaseRuntime implements Runtime {
  stack: Stack;
  lexicon: Lexicon;
  rootScope: Object;
  scope: Object;
  program: Array<Value>;
  type: string;

  constructor() {
    this.stack = stackFactory();
    this.rootScope = Object.create({});
    this.scope = this.rootScope;
    this.type = 'base';
    this.lexicon = lexicon();
  }

  unstack(newStack: Array<mixed>) {
    if (!Array.isArray(newStack)) {
      throw new Error('Aggregate is required for unstack');
    }
    this.stack.restack(newStack);
  }

  reset() {
    this.unstack([]);
    this.lexicon = lexicon();
  }

  pushScope() {
    const newScope = Object.create({});
    Object.setPrototypeOf(newScope, this.scope);
    this.scope = newScope;
  }

  popScope() {
    this.scope = Object.getPrototypeOf(this.scope);
  }

  // eslint-disable-next-line no-unused-vars
  loadModule(module: string) {
    throw new Error(
      `This runtime does not support loading modules, skipping load directive for ${module}`
    );
  }

  evaluate(source: string) {
    const srcOrError = parse(source);

    if (!Array.isArray(srcOrError)) {
      throw new Error(srcOrError.cause);
    }

    const src = srcOrError; // We know that it isn't an error anymore

    Object.assign(this.lexicon, populateLexicon(src));

    findLoadDirectives(src).forEach(loadDirective => {
      this.loadModule(loadDirective.body);
    });

    this.program = findValues(src);
    this.executeProgram();
  }

  executeProgram() {
    while (this.program.length) {
      const current = this.program.pop();

      if (!current) {
        console.warn('something is wrong, got something that isnt an ASTValue');
      }

      if (
        isBool(current) ||
        isNumber(current) ||
        isString(current) ||
        isAitValue(current) ||
        isQuotation(current)
      ) {
        this.stack.push(current);
        continue;
      } else if (isVar(current)) {
        this.scope[current.body] = this.stack.pop();
        continue;
      } else if (isGlobalVar(current)) {
        this.rootScope[current.body] = this.stack.pop();
        continue;
      } else if (isWord(current)) {
        const maybeProgram = this.handleWord(((current: any): Word));

        if (Array.isArray(maybeProgram)) {
          this.program[this.program.length] = {
            type: 'word',
            body: 'popScope'
          };
          for (let i = 0; i < maybeProgram.length; i++) {
            this.program[this.program.length] = maybeProgram[i];
          }
          this.program[this.program.length] = {
            type: 'word',
            body: 'pushScope'
          };
        } else if (maybeProgram != null) {
          this.program[this.program.length] = maybeProgram;
        }
        continue;
      } else {
        throw new Error(`Internal error: Missing handler for ASTNode of type ${current.type}`);
      }
    }
  }

  handleWord(word: Word): Array<Value> | void {
    const wordDefiniton = this.lexicon[word.body];
    const variableDefinition = this.scope[word.body];

    if (wordDefiniton == null && variableDefinition == null) {
      throw new Error(`Could not find definition of word "${word.body}"`);
    }

    if (variableDefinition != null) {
      this.stack.push(variableDefinition);
    } else if (wordDefiniton.type === 'ait') {
      return clone(wordDefiniton.fn);
    } else if (wordDefiniton.type === 'js') {
      return this.executeJSWord(wordDefiniton);
    }
  }

  executeJSWord(word: JSWord): Array<Value> | void {
    let args = [];
    for (let i = 0; i < word.arity; i++) {
      args.push(this.stack.pop());
    }

    return word.fn.apply(this, args);
  }
}
