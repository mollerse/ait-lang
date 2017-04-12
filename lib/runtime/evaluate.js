// @flow

import loadModule from './loadModule';
import aitFault from '../aitFault';

import type { AitFault } from '../aitFault';
import type { ASTNode, Definition, LoadDirective, Value } from '../parser/ast';
import type {
  Runtime,
  AitWord,
  JSFunction,
  EvaluatedValue,
  Lexicon
} from './types';

export function populateLexicon(
  ast: Array<ASTNode>,
  runtime: Runtime
): Lexicon | AitFault {
  const lexicon: Lexicon = {};

  const wordDefinitions = ast.reduce(function(
    acc: Array<Definition | LoadDirective>,
    node: ASTNode
  ) {
    if (node.type === 'definition' || node.type === 'load') {
      acc.push(node);
    }
    return acc;
  }, []);

  for (let node of wordDefinitions) {
    if (node.type === 'load') {
      const module = evaluateLoad(node, runtime);

      if (!Array.isArray(module)) {
        return module;
      }

      module.forEach(def => lexicon[def.name] = def);
    } else if (node.type === 'definition') {
      const def = aitWord(node);

      if (def.type === 'aitFault') {
        return def;
      }

      lexicon[def.name] = def;
    }
  }

  return lexicon;
}

function evaluateLoad(
  loadDirective: LoadDirective,
  runtime: Runtime
): Array<JSFunction | AitWord> | AitFault {
  if (runtime.type === 'browser') {
    return aitFault(
      `This runtime does not support loading modules, skipping load directive for ${loadDirective.body}`
    );
  }

  const words = loadModule(loadDirective.body, runtime.root);

  if (!Array.isArray(words)) {
    return words;
  }

  return words.map(function(word) {
    if (word.type === 'js') {
      return word;
    } else {
      return aitWord(word);
    }
  });
}

function aitWord({ body: definition }: Definition): AitWord {
  return {
    type: 'ait',
    name: definition.keyword,
    fn: definition.body.map(evaluateValue)
  };
}

export function evaluateValue(value: Value): EvaluatedValue {
  switch (value.type) {
    case 'word':
      return value.body;
    case 'quotation':
      return value.body.map(evaluateValue);
    case 'primitive':
      return value.body;
    default:
      // TODO: Fix when https://github.com/facebook/flow/issues/451 lands
      console.error(
        `Internal Type Error: Switch-statement missing clause for ${value.type}`
      );
      return 0;
  }
}
