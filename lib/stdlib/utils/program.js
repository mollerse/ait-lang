// @flow
import clone from 'clone';
import type { Value, Quotation } from '../../parser/ast';
import {
  quotationNonReversed as quotation,
  word,
  aitValue as value,
  aitVar
} from '../../parser/ast';

export function exec(quot: Quotation): Array<Value> {
  return clone(quot.body, false);
}

export function execWithArity(arity: number, quot: Quotation): Array<Value> {
  const ret = [word('resolveStack')];
  ret.push.apply(ret, clone(quot.body, false));
  ret.push(word('forkStack'), value(arity));
  return ret;
}

export function assignVariableEmptyAggr(name: string): Array<Value> {
  return [aitVar(name), quotation([])];
}

export function assignVariableAggr(val: Quotation, name: string): Array<Value> {
  return [aitVar(name), val];
}

export function assignVariable(val: mixed, name: string): Array<Value> {
  return [aitVar(name), value(val)];
}

export { word, quotation, quotation as aggregate, value };
