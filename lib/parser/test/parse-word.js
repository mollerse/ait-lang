// @flow

import test from 'ava';
import {silentParse as parse} from '../parse';
import {
  wordLiteral
} from '../ast';

test('should parse single words', function(t) {
  const result = parse('test')[0];
  if (result.type === 'word') {
    t.deepEqual(result, wordLiteral('test'));
  }
});

test('should parse symbolic words', function(t) {
  const result = parse('+')[0];
  if (result.type === 'word') {
    t.deepEqual(result, wordLiteral('+'));
  }
});

test('should parse strange words', function(t) {
  const result = parse('vec3 map+ -map <acc');
  t.deepEqual(result[0], wordLiteral('vec3'));
  t.deepEqual(result[1], wordLiteral('map+'));
  t.deepEqual(result[2], wordLiteral('-map'));
  t.deepEqual(result[3], wordLiteral('<acc'));
});

test('should parse multiple words', function(t) {
  const result = parse('test test');
  t.deepEqual(result[0], wordLiteral('test'));
  t.deepEqual(result[1], wordLiteral('test'));
});

test('should parse multiple words separated by newline', function(t) {
  const result = parse('test\ntest');
  t.deepEqual(result[0], wordLiteral('test'));
  t.deepEqual(result[1], wordLiteral('test'));
});
