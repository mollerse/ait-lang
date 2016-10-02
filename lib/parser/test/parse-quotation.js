// @flow

import test from 'ava';
import parse from '../parse';
import {
  record,
  wordLiteral,
  quotation,
  primitiveString,
  primitiveNumber
} from '../ast';

test('should parse simple quotations', function(t) {
  t.plan(1);
  const result = parse('[ test ]')[0];
  if (result.type === 'quotation') {
    t.deepEqual(result, quotation([wordLiteral('test')]));
  }
});

test('should parse quotations', function(t) {
  t.plan(1);
  const result = parse('[ test "asdf" ]')[0];
  if (result.type === 'quotation') {
    t.deepEqual(result, quotation([
      wordLiteral('test'),
      primitiveString('asdf')
    ]));
  }
});

test('should parse nested quotation', function(t) {
  t.plan(1);
  const result = parse('[ [ "asdf" ] ]')[0];
  if (result.type === 'quotation') {
    t.deepEqual(result, quotation([
      quotation([primitiveString('asdf')])
    ]));
  }
});

test('should parse nested record', function(t) {
  t.plan(1);
  const result = parse('[ { "asdf" 123 } ]')[0];
  if (result.type === 'quotation') {
    t.deepEqual(result, quotation([
      record([
        [primitiveString('asdf'), primitiveNumber('123')]
      ])
    ]));
  }
});
