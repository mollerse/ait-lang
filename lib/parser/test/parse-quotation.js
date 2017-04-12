// @flow

import test from 'ava';
import parse from '../parse';
import { word, quotation, primitiveString } from '../ast';

test('should parse simple quotations', function(t) {
  t.plan(1);
  const result = parse('[ test ]')[0];
  if (result.type === 'quotation') {
    t.deepEqual(result, quotation([word('test')]));
  }
});

test('should parse quotations', function(t) {
  t.plan(1);
  const result = parse('[ test "asdf" ]')[0];
  if (result.type === 'quotation') {
    t.deepEqual(result, quotation([word('test'), primitiveString('asdf')]));
  }
});

test('should parse nested quotation', function(t) {
  t.plan(1);
  const result = parse('[ [ "asdf" ] ]')[0];
  if (result.type === 'quotation') {
    t.deepEqual(result, quotation([quotation([primitiveString('asdf')])]));
  }
});
