import test from 'ava';
import stack from '../stack';

test('should pop same as pushed', function(t) {
  t.plan(1);
  const s = stack();
  const v = [];
  s.push(v);
  t.is(s.pop(), v);
});

test('should throw when poping on empty', function(t) {
  t.plan(1);
  const s = stack();
  t.throws(() => s.pop());
});

test('`1 [2 3] nullary` == 1 3', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.fork(0);
  s.push(2);
  s.push(3);
  s.resolve();
  t.deepEqual(s.stack(), [1, 3]);
});

test('`1 2 [3 4] unary` == 1 4', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(1);
  s.push(3);
  s.push(4);
  s.resolve();
  t.deepEqual(s.stack(), [1, 4]);
});

test('`[3 4] unary` == runtime error', function(t) {
  t.plan(1);
  const s = stack();
  s.fork(1);
  s.push(3);
  s.push(4);
  t.throws(() => s.resolve());
});

test('`1 2 3 [4 5] binary` == 1 5', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.push(3);
  s.fork(2);
  s.push(4);
  s.push(5);
  s.resolve();
  t.deepEqual(s.stack(), [1, 5]);
});

test('`3 [4 5] binary` == runtime error', function(t) {
  t.plan(1);
  const s = stack();
  s.push(3);
  s.fork(2);
  s.push(4);
  s.push(5);
  t.throws(() => s.resolve());
});

test('`3 4 [5 6] ternary` == runtime error', function(t) {
  t.plan(1);
  const s = stack();
  s.push(3);
  s.push(4);
  s.fork(3);
  s.push(5);
  s.push(6);
  t.throws(() => s.resolve());
});

test('`1 2 [+] nullary` == 1 2 3', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(0);
  s.push(s.pop() + s.pop());
  s.resolve();
  t.deepEqual(s.stack(), [1, 2, 3]);
});

test('`1 2 [+] unary` == 1 3', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(1);
  s.push(s.pop() + s.pop());
  s.resolve();
  t.deepEqual(s.stack(), [1, 3]);
});

test('`1 2 [+] binary` == 3', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(2);
  s.push(s.pop() + s.pop());
  s.resolve();
  t.deepEqual(s.stack(), [3]);
});

test('`1 2 [ [+] binary ] nullary` == 1 2 3', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(0);
  s.fork(2);
  s.push(s.pop() + s.pop());
  s.resolve();
  s.resolve();
  t.deepEqual(s.stack(), [1, 2, 3]);
});

test('`1 2 [ [+] binary ] unary` == 1 3', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(1);
  s.fork(2);
  s.push(s.pop() + s.pop());
  s.resolve();
  s.resolve();
  t.deepEqual(s.stack(), [1, 3]);
});

test('`1 2 [ [+] nullary ] unary` == 1 3', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(1);
  s.fork(0);
  s.push(s.pop() + s.pop());
  s.resolve();
  s.resolve();
  t.deepEqual(s.stack(), [1, 3]);
});

test('`1 2 [ [+] nullary ] binary` == 3', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(2);
  s.fork(0);
  s.push(s.pop() + s.pop());
  s.resolve();
  s.resolve();
  t.deepEqual(s.stack(), [3]);
});

test('`1 2 [ [+] nullary 4 ] binary` == 4', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(2);
  s.fork(0);
  s.push(s.pop() + s.pop());
  s.resolve();
  s.push(4);
  s.resolve();
  t.deepEqual(s.stack(), [4]);
});

test('`1 2 [ [ + ] nullary  1 ] unary` == 1 1', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(1);
  s.fork(0);
  s.push(s.pop() + s.pop());
  s.resolve();
  s.push(1);
  s.resolve();
  t.deepEqual(s.stack(), [1, 1]);
});

test('`1 2 [ 3 [ + ] nullary ] unary` == 1 5', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.fork(1);
  s.push(3);
  s.fork(0);
  s.push(s.pop() + s.pop());
  s.resolve();
  s.resolve();
  t.deepEqual(s.stack(), [1, 5]);
});

test('`1 2 3 4 [ + + + ] nullary` == 1 2 3 4 10', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);
  s.fork(0);
  s.push(s.pop() + s.pop());
  s.push(s.pop() + s.pop());
  s.push(s.pop() + s.pop());
  s.resolve();
  s.resolve();
  t.deepEqual(s.stack(), [1, 2, 3, 4, 10]);
});
