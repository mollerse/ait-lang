// @flow

import test from 'ava';
import {silentParse as parse} from '../parse';
import {
  primitiveString,
  primitiveBoolean,
  primitiveNumber
} from '../ast';

test('should parse simple strings', function(t) {
  const result = parse('"asdf"')[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveString('asdf'));
  }
});

test('should parse strings with single-ticks', function(t) {
  const result = parse("'asdf'")[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveString('asdf'));
  }
});

test('should parse strings with spaces', function(t) {
  const result = parse('" asdf fdsa "')[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveString(' asdf fdsa '));
  }
});

test('should parse multiple strings', function(t) {
  const result = parse('"asdf" "fdsa"');
  t.deepEqual(result[0], primitiveString('asdf'));
  t.deepEqual(result[1], primitiveString('fdsa'));
});

test('should parse simple numbers', function(t) {
  const result = parse('123')[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveNumber('123'));
  }
});

test('should parse negative numbers', function(t) {
  const result = parse('-123')[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveNumber('-123'));
  }
});

test('should parse more intricate numbers', function(t) {
  const result = parse('+123.321')[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveNumber('+123.321'));
  }
});

test('should parse big numbers', function(t) {
  const result = parse('1.321e10')[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveNumber('1.321e10'));
  }
});

test('should parse distinguish numbers and quoted numbers', function(t) {
  const result = parse('123 "123"');
  t.deepEqual(result[0], primitiveNumber('123'));
  t.deepEqual(result[1], primitiveString('123'));
});

test('should parse true', function(t) {
  const result = parse('true')[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveBoolean('true'));
  }
});

test('should parse false', function(t) {
  const result = parse('true')[0];
  if (result.type === 'primitive') {
    t.deepEqual(result, primitiveBoolean('true'));
  }
});

test('should parse distinguish booleans and quoted booleans', function(t) {
  const result = parse('true "true"');
  t.deepEqual(result[0], primitiveBoolean('true'));
  t.deepEqual(result[1], primitiveString('true'));
});
