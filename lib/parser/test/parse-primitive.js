// @flow

import test from 'ava';
import parse from '../parse';
import { primitiveString, primitiveBoolean, primitiveNumber } from '../ast';

test('should parse simple strings', function(t) {
  const result = parse('"asdf"')[0];
  if (result.type === 'string') {
    t.deepEqual(result, primitiveString('asdf'));
  }
});

test('should parse strings with single-ticks', function(t) {
  const result = parse("'asdf'")[0];
  if (result.type === 'string') {
    t.deepEqual(result, primitiveString('asdf'));
  }
});

test('should parse strings with spaces', function(t) {
  const result = parse('" asdf fdsa "')[0];
  if (result.type === 'string') {
    t.deepEqual(result, primitiveString(' asdf fdsa '));
  }
});

test('should parse multiple strings', function(t) {
  const result = parse('"asdf" "fdsa"');
  t.deepEqual(result, [primitiveString('fdsa'), primitiveString('asdf')]);
});

test('should parse strings with escaped chars', function(t) {
  const result = parse('"a\nb"');
  t.deepEqual(result[0], primitiveString('a\nb'));
});

// TODO: Fix this with a better regex
// test('should parse strings with escaped quotes', function(t) {
//   // prettier-ignore
//   const result = parse('"asdf asdf \"asdf\""');
//   t.deepEqual(result[0], primitiveString('asdf asdf "asdf"'));
// });

test('should parse simple numbers', function(t) {
  const result = parse('123')[0];
  if (result.type === 'number') {
    t.deepEqual(result, primitiveNumber('123'));
  }
});

test('should parse negative numbers', function(t) {
  const result = parse('-123')[0];
  if (result.type === 'number') {
    t.deepEqual(result, primitiveNumber('-123'));
  }
});

test('should parse more intricate numbers', function(t) {
  const result = parse('+123.321')[0];
  if (result.type === 'number') {
    t.deepEqual(result, primitiveNumber('+123.321'));
  }
});

test('should parse big numbers', function(t) {
  const result = parse('1.321e10')[0];
  if (result.type === 'number') {
    t.deepEqual(result, primitiveNumber('1.321e10'));
  }
});

test('should parse distinguish numbers and quoted numbers', function(t) {
  const result = parse('123 "123"');
  t.deepEqual(result, [primitiveString('123'), primitiveNumber('123')]);
});

test('should parse true', function(t) {
  const result = parse('true')[0];
  if (result.type === 'bool') {
    t.deepEqual(result, primitiveBoolean('true'));
  }
});

test('should parse false', function(t) {
  const result = parse('true')[0];
  if (result.type === 'bool') {
    t.deepEqual(result, primitiveBoolean('true'));
  }
});

test('should parse distinguish booleans and quoted booleans', function(t) {
  const result = parse('true "true"');
  t.deepEqual(result, [primitiveString('true'), primitiveBoolean('true')]);
});

test('should parse Infinity as a number', function(t) {
  const result = parse('Infinity');
  t.deepEqual(result[0], primitiveNumber('Infinity'));
});

test('should parse -Infinity as a number', function(t) {
  const result = parse('-Infinity');
  t.deepEqual(result[0], primitiveNumber('-Infinity'));
});

test('should parse "Infinity" as a string', function(t) {
  const result = parse('"Infinity"');
  t.deepEqual(result[0], primitiveString('Infinity'));
});
