// @flow

import test from 'ava';
import parse from '../parse';
import { aitVar, aitGlobalVar } from '../ast';

test('should parse variables', function(t) {
  t.plan(1);
  const result = parse('-> a')[0];
  if (result.type === 'var') {
    t.deepEqual(result, aitVar('a'));
  }
});

test('should parse global variables', function(t) {
  t.plan(1);
  const result = parse('->> a')[0];
  if (result.type === 'globalVar') {
    t.deepEqual(result, aitGlobalVar('a'));
  }
});
