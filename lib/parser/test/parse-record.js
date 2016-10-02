// @flow

import test from 'ava';
import parse from '../parse';
import {
  record,
  quotation,
  primitiveString,
  primitiveNumber
} from '../ast';

test('should parse simple records', function(t) {
  t.plan(1);
  const result = parse('{ "test" 123 }')[0];
  if (result.type === 'record') {
    t.deepEqual(result, record([
      [primitiveString('test'), primitiveNumber('123')]
    ]));
  }
});

test('should parse records', function(t) {
  t.plan(1);
  const result = parse('{ "1" 1 "2" 2 }')[0];
  if (result.type === 'record') {
    t.deepEqual(result, record([
      [primitiveString('1'), primitiveNumber('1')],
      [primitiveString('2'), primitiveNumber('2')]
    ]));
  }
});

test('should parse nested quotation', function(t) {
  t.plan(1);
  const result = parse('{ "a" [ "asdf" ] }')[0];
  if (result.type === 'record') {
    t.deepEqual(result, record([
      [primitiveString('a'), quotation([primitiveString('asdf')])]
    ]));
  }
});

test('should parse nested record', function(t) {
  t.plan(1);
  const result = parse('{ "a" { "asdf" 123 } }')[0];
  if (result.type === 'record') {
    t.deepEqual(result, record([
      [primitiveString('a'), record([
        [primitiveString('asdf'), primitiveNumber('123')]
      ])]
    ]));
  }
});
