// @flow

import test from 'ava';
import parse from '../parse';
import {
  record,
  wordLiteral,
  quotation,
  primitiveString,
  primitiveNumber,
  definition
} from '../ast';

test('should parse simple definitions', function(t) {
  t.plan(1);
  const result = parse('bla: word ;')[0];
  if (result.type === 'definition') {
    t.deepEqual(result, definition(['bla', [
      wordLiteral('word')
    ]]));
  }
});

test('should parse definitions', function(t) {
  t.plan(1);
  const result = parse(`
    bla:
      1 2
      +
      word ;
  `)[0];
  if (result.type === 'definition') {
    t.deepEqual(result, definition(['bla', [
      primitiveNumber('1'),
      primitiveNumber('2'),
      wordLiteral('+'),
      wordLiteral('word')
    ]]));
  }
});

test('should parse definitions with symbolic names', function(t) {
  t.plan(1);
  const result = parse(`
    <bla: 1 2 + ;
  `)[0];
  if (result.type === 'definition') {
    t.deepEqual(result, definition(['<bla', [
      primitiveNumber('1'),
      primitiveNumber('2'),
      wordLiteral('+')
    ]]));
  }
});

test('should parse definitions with quotations', function(t) {
  t.plan(1);
  const result = parse(`
    bla: [ 1 2 ] + ;
  `)[0];
  if (result.type === 'definition') {
    t.deepEqual(result, definition(['bla', [
      quotation([
        primitiveNumber('1'),
        primitiveNumber('2')
      ]),
      wordLiteral('+')
    ]]));
  }
});

test('should parse definitions with records', function(t) {
  t.plan(1);
  const result = parse(`
    bla: { "1" 1 "2" 2 } + ;
  `)[0];
  if (result.type === 'definition') {
    t.deepEqual(result, definition(['bla', [
      record([
        [primitiveString('1'), primitiveNumber('1')],
        [primitiveString('2'), primitiveNumber('2')]
      ]),
      wordLiteral('+')
    ]]));
  }
});
