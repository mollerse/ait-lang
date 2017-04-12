// @flow

import test from 'ava';
import parse from '../parse';
import { word } from '../ast';

test('should parse single words', function(t) {
  const result = parse('test')[0];
  if (result.type === 'word') {
    t.deepEqual(result, word('test'));
  }
});

test('should parse symbolic words', function(t) {
  const result = parse('+')[0];
  if (result.type === 'word') {
    t.deepEqual(result, word('+'));
  }
});

test('should parse strange words', function(t) {
  const result = parse('vec3 map+ -map <acc');
  t.deepEqual(result[0], word('vec3'));
  t.deepEqual(result[1], word('map+'));
  t.deepEqual(result[2], word('-map'));
  t.deepEqual(result[3], word('<acc'));
});

test('should parse multiple words', function(t) {
  const result = parse('test test');
  t.deepEqual(result[0], word('test'));
  t.deepEqual(result[1], word('test'));
});

test('should parse multiple words separated by newline', function(t) {
  const result = parse('test\ntest');
  t.deepEqual(result[0], word('test'));
  t.deepEqual(result[1], word('test'));
});
