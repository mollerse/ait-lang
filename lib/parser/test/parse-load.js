import test from 'ava';
import {silentParse as parse} from '../parse';
import { loadDirective } from '../ast';

test('should parse load directives', function(t) {
  t.plan(1);
  const result = parse('@load asdf ;')[0];
  if (result.type === 'load') {
    t.deepEqual(result, loadDirective('asdf'));
  }
});

test('should parse load directives with relative path', function(t) {
  t.plan(1);
  const result = parse('@load ./asdf ;')[0];
  if (result.type === 'load') {
    t.deepEqual(result, loadDirective('./asdf'));
  }
});

test('should parse load directives with extension', function(t) {
  t.plan(1);
  const result = parse('@load ./asdf.js ;')[0];
  if (result.type === 'load') {
    t.deepEqual(result, loadDirective('./asdf.js'));
  }
});
