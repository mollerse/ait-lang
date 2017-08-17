// @flow

import type { Definition, Value, ASTNode } from '../parser/ast';
import type { Runtime } from './runtime';

import { findDefinitions } from '../parser/ast-walkers';

import stdlib from '../stdlib';

export type JSWord = {
  type: 'js',
  name: string,
  fn: Function,
  arity: number
};

export type AitWord = {
  type: 'ait',
  name: string,
  fn: Array<Value>
};

export type Lexicon = { [key: string]: AitWord | JSWord };

export function aitWord({ body: definition }: Definition): AitWord {
  return {
    type: 'ait',
    name: definition.keyword,
    fn: definition.body
  };
}

export function jsWord(arity: number, name: string, fn: Function): JSWord {
  return {
    type: 'js',
    name,
    fn,
    arity
  };
}

export function lookupVariable(runtime: Runtime, name: string) {
  return runtime.scope[name];
}

export function storeVariable(runtime: Runtime, name: string, value: Value) {
  runtime.scope[name] = value;
}

export function storeRootVariable(runtime: Runtime, name: string, value: Value) {
  runtime.rootScope[name] = value;
}

export function lexicon(): Lexicon {
  return stdlib;
}

export function populateLexicon(src: Array<ASTNode>): Lexicon {
  const populatedLexicon = {};

  const wordDefinitions = findDefinitions(src);

  wordDefinitions.forEach(function(definition) {
    const def = aitWord(definition);
    populatedLexicon[def.name] = def;
  });

  return populatedLexicon;
}
