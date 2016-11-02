// @flow

import loadModule from './loadModule';
import type {
  ASTNode,
  Primitive,
  WordLiteral,
  Quotation,
  Record,
  Definition,
  LoadDirective,
  Value
} from '../parser/ast';
import type { Runtime } from '../runtime/runtime';

export type EvaluatedPrimitive = string | number | boolean;
export type EvaluatedValue = EvaluatedPrimitive | EvaluatedQuotation | EvaluatedRecord;
export type EvaluatedQuotation = Array<EvaluatedValue | EvaluatedWord>;
export type EvaluatedRecord = { [key: EvaluatedPrimitive]: EvaluatedValue};
export type EvaluatedDefinition = {
  keyword: string,
  body: Array<EvaluatedValue | EvaluatedWord>
};
export type JSFunction = {
  type: 'js',
  fn: Function
};
export type AitWord = {
  type: 'ait',
  name: string,
  fn: Array<EvaluatedValue | EvaluatedWord>
};
export type EvaluatedWord = JSFunction | AitWord;
export type Module = { [key: string]: EvaluatedWord };

export default function evaluate(ast: Array<ASTNode>, runtime: Runtime): void {
  ast.forEach(function (node) {
    switch (node.type) {
      case 'load':
        evaluateLoad(node, runtime);
        break;
      case 'definition':
        const definition = evaluateDefinition(node, runtime);
        runtime.load({
          [definition.keyword]: {
            type: 'ait',
            fn: definition.body,
            name: definition.keyword
          }
        });
        break;
      case 'word':
        const word = evaluateWord(node, runtime);
        runtime.evaluateInScope(word);
        break;
      case 'quotation':
        const quotation = evaluateQuotation(node, runtime);
        runtime.pushOnStack(quotation);
        break;
      case 'record':
        const record = evaluateRecord(node, runtime);
        runtime.pushOnStack(record);
        break;
      case 'primitive':
        const value = evaluatePrimitive(node);
        runtime.pushOnStack(value);
        break;
      default:
        break;
    }
  });
}

export function evaluateLoad(loadDirective: LoadDirective, runtime: Runtime): void {
  if (runtime.type === 'browser') {
    console.warn(`This runtime does not support loading modules, skipping load directive for ${loadDirective.body}`);
    return;
  }
  loadModule(loadDirective.body, runtime);
}

export function evaluateDefinition(definition: Definition, runtime: Runtime): EvaluatedDefinition {
  return {
    keyword: definition.body.keyword,
    body: definition.body.body.map(evaluateWordOrValue.bind(null, runtime))
  };
}

export function evaluateWord(word: WordLiteral, runtime: Runtime): EvaluatedWord {
  const wordDefinition = runtime.lexicon[word.body];

  if (!wordDefinition) {
    throw new Error(`Unrecoverable runtime fault: ${word.body} was not found in the lexicon!`);
  }

  return wordDefinition;
}

export function evaluatePrimitive(primitive: Primitive): EvaluatedPrimitive {
  return primitive.body;
}

export function evaluateQuotation(quotation: Quotation, runtime: Runtime): EvaluatedQuotation {
  return quotation.body.map(evaluateWordOrValue.bind(null, runtime));
}

export function evaluateRecord(record: Record, runtime: Runtime): EvaluatedRecord {
  const ret: EvaluatedRecord = {};
  return record.body.reduce(function(acc, kvPair) {
    acc[evaluatePrimitive(kvPair[0])] = evaluateValue(kvPair[1], runtime);
    return acc;
  }, ret);
}

function evaluateValue(value: Value, runtime: Runtime): EvaluatedValue {
  switch (value.type) {
    case 'primitive':
      return evaluatePrimitive(value);
    case 'record':
      return evaluateRecord(value, runtime);
    case 'quotation':
      return evaluateQuotation(value, runtime);
    default:
      console.warn(`Switch-statement missing clause for ${value.type}`);
      return 0; // TODO: Fix when https://github.com/facebook/flow/issues/451 lands
  }
}

function evaluateWordOrValue(runtime, value): EvaluatedWord | EvaluatedValue {
  switch (value.type) {
    case 'word':
      return evaluateWord(value, runtime);
    case 'quotation':
      return evaluateQuotation(value, runtime);
    case 'record':
      return evaluateRecord(value, runtime);
    case 'primitive':
      return evaluatePrimitive(value, runtime);
    default:
      console.warn(`Switch-statement missing clause for ${value.type}`);
      return 0; // TODO: Fix when https://github.com/facebook/flow/issues/451 lands
  }
}
