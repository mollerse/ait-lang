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
  t.deepEqual(s.stack(), [1, 2, 3, 4, 10]);
});

test('`[1 2 3 4] 0 [ at ] nullary` == [1 2 3 4] 0 1', function(t) {
  t.plan(1);
  const s = stack();
  s.push([1, 2, 3, 4]);
  s.push(0);
  s.fork(0);
  const index = s.pop();
  const aggr = s.pop();
  s.push(aggr[index]);
  s.resolve();
  t.deepEqual(s.stack(), [[1, 2, 3, 4], 0, 1]);
});

test('`[[1] [2] [3] [4]] 0 [ at ] nullary` == [[1] [2] [3] [4]] 0 [1]', function(t) {
  t.plan(1);
  const s = stack();
  s.push([[1], [2], [3], [4]]);
  s.push(0);
  s.fork(0);
  const index = s.pop();
  const aggr = s.pop();
  s.push(aggr[index]);
  s.resolve();
  t.deepEqual(s.stack(), [[[1], [2], [3], [4]], 0, [1]]);
});

test('`[1 2] [ dup pop ] nullary` == [1 2] [1 2]', function(t) {
  t.plan(1);
  const s = stack();
  s.push([1, 2]);
  s.fork(0);
  const aggr = s.pop();
  s.push(aggr);
  s.push([...aggr]);
  s.pop();
  s.resolve();
  t.deepEqual(s.stack(), [[1,2], [1,2]]);
});

// This test fails, known bug
/*
  When resolving forks that consume all of the elements of its parent fork and
  produces no new items it will restack the parent fork with elements from the
  grand-parent stack. If the parent-fork also does not produce any items it will
  wrongly duplicate the top of the grand-parent stack.

  Joy throws an error when this happens.
*/
// test('`1 [ dup pop [ pop ] unary ] nullary` == runtime error', function(t) {
//   t.plan(1);
//   const s = stack();
//   s.push(1);
//   s.fork(0);
//   const v = s.pop();
//   s.push(v);
//   s.push(v);
//   s.pop();
//   s.fork(1);
//   s.pop();
//   t.throws(() => s.resolve());
// });

//This is weird behavior, but in line with how Joy does it.
test('`1 1 [ dup pop [pop] unary ] nullary` == [1 1 1]', function(t) {
  t.plan(1);
  const s = stack();
  s.push(1);
  s.push(1);
  s.fork(0);
  const n = s.pop();
  s.push(n);
  s.push(n);
  s.pop();
  s.fork(1);
  s.pop();
  s.resolve();
  s.resolve();
  t.deepEqual(s.stack(), [1,1,1]);
});
