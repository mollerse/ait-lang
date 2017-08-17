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
  t.deepEqual(result, [word('<acc'), word('-map'), word('map+'), word('vec3')]);
});

test('should parse multiple words', function(t) {
  const result = parse('test1 test2');
  t.deepEqual(result, [word('test2'), word('test1')]);
});

test('should parse multiple words separated by newline', function(t) {
  const result = parse('test1\ntest2');
  t.deepEqual(result, [word('test2'), word('test1')]);
});

test('should parse words starting with -', function(t) {
  const result = parse('-test')[0];
  if (result.type === 'word') {
    t.deepEqual(result, word('-test'));
  }
});

test('should parse || as word', function(t) {
  const result = parse('||')[0];
  if (result.type === 'word') {
    t.deepEqual(result, word('||'));
  }
});

test('should parse && as word', function(t) {
  const result = parse('&&')[0];
  if (result.type === 'word') {
    t.deepEqual(result, word('&&'));
  }
});

test('should parse != as word', function(t) {
  const result = parse('!=')[0];
  if (result.type === 'word') {
    t.deepEqual(result, word('!='));
  }
});
