import { testProgram } from './_runTest';

// 'cons'
testProgram('[] [] cons', [[[]]]);
testProgram('[1] [2] cons', [[[1], 2]]);
testProgram('[2] [1] cons', [[[2], 1]]);
testProgram('1 [2] cons', [[1, 2]]);
testProgram('2 [1] cons', [[2, 1]]);
testProgram('2 ["asdf"] cons', [[2, 'asdf']]);
// 'swons'
testProgram('[] [] swons', [[[]]]);
testProgram('[1] [2] swons', [[[2], 1]]);
testProgram('[2] [1] swons', [[[1], 2]]);
testProgram('[2] 1 swons', [[1, 2]]);
testProgram('[1] 2 swons', [[2, 1]]);
testProgram('["asdf"] 2 swons', [[2, 'asdf']]);
// 'append'
testProgram('[] [] append', [[[]]]);
testProgram('[1] [2] append', [[2, [1]]]);
testProgram('[2] [1] append', [[1, [2]]]);
testProgram('1 [2] append', [[2, 1]]);
testProgram('2 [1] append', [[1, 2]]);
testProgram('2 ["asdf"] append', [['asdf', 2]]);
// 'swappend'
testProgram('[] [] swappend', [[[]]]);
testProgram('[1] [2] swappend', [[1, [2]]]);
testProgram('[2] [1] swappend', [[2, [1]]]);
testProgram('[2] 1 swappend', [[2, 1]]);
testProgram('[1] 2 swappend', [[1, 2]]);
testProgram('["asdf"] 2 swappend', [['asdf', 2]]);
// 'uncons'
testProgram('[1 2] uncons', [1, [2]]);
testProgram('[1] uncons', [1, []]);
testProgram('[[1 2] 3] uncons', [[1, 2], [3]]);
// 'unswons'
testProgram('[1 2] unswons', [[2], 1]);
testProgram('[1] unswons', [[], 1]);
testProgram('[[1 2] 3] unswons', [[3], [1, 2]]);
// 'concat'
testProgram('[] [] concat', [[]]);
testProgram('[1] [2] concat', [[1, 2]]);
testProgram('[2] [1] concat', [[2, 1]]);
testProgram('[1] 2 concat', [[1, 2]]);
testProgram('[1] "asdf" concat', [[1, 'asdf']]);
testProgram('[] 1 concat', [[1]]);
// 'enconcat'
testProgram('2 [] [] enconcat', [[2]]);
testProgram('2 [1] [3] enconcat', [[1, 2, 3]]);
testProgram('2 [3] [1] enconcat', [[3, 2, 1]]);
testProgram('[2] [1] [3] enconcat', [[1, [2], 3]]);
testProgram('"asdf" [1] [] enconcat', [[1, 'asdf']]);
// 'first'
testProgram('[1] first', [1]);
testProgram('[1 2] first', [1]);
testProgram('[1 2 3] first', [1]);
testProgram('[[1 2 3]] first', [[1, 2, 3]]);
// 'last'
testProgram('[1] last', [1]);
testProgram('[1 2] last', [2]);
testProgram('[1 2 3] last', [3]);
testProgram('[[1 2 3]] last', [[1, 2, 3]]);
// 'rest'
testProgram('[1] rest', [[]]);
testProgram('[1 2] rest', [[2]]);
testProgram('[1 2 3] rest', [[2, 3]]);
// 'at'
testProgram('[1 2] 1 at', [2]);
testProgram('[1 2] 0 at', [1]);
testProgram('[[1 2] 3] 0 at', [[1, 2]]);
// 'of'
testProgram('1 [1 2] of', [2]);
testProgram('0 [1 2] of', [1]);
testProgram('0 [[1 2] 3] of', [[1, 2]]);
// 'ins'
testProgram('3 [1 2] 1 ins', [[1, 3]]);
testProgram('3 [1 2] 0 ins', [[3, 2]]);
testProgram('2 [1 4 3] 1 ins', [[1, 2, 3]]);
// 'size'
testProgram('[] size', [0]);
testProgram('[1] size', [1]);
testProgram('[1 2] size', [2]);
testProgram('[1 2 3] size', [3]);
// 'drop'
testProgram('[] 0 drop', [[]]);
testProgram('[1] 1 drop', [[]]);
testProgram('[1] 0 drop', [[1]]);
testProgram('[1 2] 1 drop', [[2]]);
testProgram('[1 2 3] 1 drop', [[2, 3]]);
testProgram('[] 1 drop', [[]]);
testProgram('[1] 2 drop', [[]]);
// 'take'
testProgram('[] 0 take', [[]]);
testProgram('[1] 1 take', [[1]]);
testProgram('[1] 0 take', [[]]);
testProgram('[1 2] 1 take', [[1]]);
testProgram('[1 2 3] 1 take', [[1]]);
testProgram('[1 2 3] 2 take', [[1, 2]]);
testProgram('[] 1 take', [[]]);
testProgram('[1] 2 take', [[1]]);
// 'step'
testProgram('[1] [ 1 + ] step', [2]);
testProgram('[1 2 3] [ 1 + ] step', [2, 3, 4]);
testProgram('[] [ 1 + ] step', []);
testProgram('[1 2 3] [ dup ] step', [1, 1, 2, 2, 3, 3]);
testProgram('[1 2 3] [] step', [1, 2, 3]);
testProgram('[1 2 3] [ _i ] step', [1, 0, 2, 1, 3, 2]);
testProgram('[1 2 3] [ _a ] step', [1, [1, 2, 3], 2, [1, 2, 3], 3, [1, 2, 3]]);
// 'map'
testProgram('[1] [ 1 + ] map', [[2]]);
testProgram('[1 2 3] [ 1 + ] map', [[2, 3, 4]]);
testProgram('[1 2 3] [ _i + ] map', [[1, 3, 5]]);
testProgram('[1 2 3] [ _a _i at + ] map', [[2, 4, 6]]);
testProgram('[] [ 1 + ] map', [[]]);
// 'map2'
testProgram('[1] [1] [ + ] map2', [[2]]);
testProgram('[1 2 3] [1 2 3] [ + ] map2', [[2, 4, 6]]);
testProgram('[2 4 6] [1 2 3] [ / ] map2', [[2, 2, 2]]);
testProgram('[1] [] [ + ] map2', [[]]);
testProgram('[1 2 3] [1 2] [ + ] map2', [[2, 4]]);
testProgram('[3 4 5] [1 2] [ - ] map2', [[2, 2]]);
testProgram('[1 2 3] [1 2] [ _i + + ] map2', [[2, 5]]);
testProgram('[1 2 3] [1 2] [ _a1 _i at _a2 _i at + + + ] map2', [[4, 8]]);
// 'sort'
testProgram('[1] sort', [[1]]);
testProgram('[1 2 3] sort', [[1, 2, 3]]);
testProgram('[] sort', [[]]);
testProgram('[3 1 2] sort', [[1, 2, 3]]);
testProgram('["c" "a" "b"] sort', [['c', 'a', 'b']]);
testProgram('["a" 1 "c"] sort', [['a', 1, 'c']]);
// 'sortBy'
testProgram('[1] "" sortBy', [[1]]);
testProgram('[[1] [3] [2]] 0 sortBy', [[[1], [2], [3]]]);
testProgram('[[1 3] [3 2] [2 1]] 1 sortBy', [[[2, 1], [3, 2], [1, 3]]]);
testProgram('[] [0] sortBy', [[]]);
// 'fold'
testProgram('[1] [] [ 1 + concat ] fold', [[2]]);
testProgram('[1 2 3] [] [ 1 + concat ] fold', [[2, 3, 4]]);
testProgram('[] [] [ 1 + concat ] fold', [[]]);
testProgram('[1 2 3] 0 [ + ] fold', [6]);
testProgram('[1 2 3] 0 [ _i + + ] fold', [9]);
testProgram('[1 2 3] 0 [ _a _i at + + ] fold', [12]);
testProgram('[1 2 3] false [ = 3 || ] fold', [true]);
// 'filter'
testProgram('[1 2 3 4 5 6] [2 mod 0 =] filter', [[2, 4, 6]]);
testProgram('[] [true] filter', [[]]);
testProgram('[1 2 3] [ _i 1 + = ] filter', [[1, 2, 3]]);
testProgram('[1 2 3] [ _a _i at = ] filter', [[1, 2, 3]]);
// 'split'
testProgram('[1 2 3 4 5 6] [3 <] split', [[1, 2], [3, 4, 5, 6]]);
testProgram('2 [6 8 1 3 5 7 9] [>] split', [2, [1], [6, 8, 3, 5, 7, 9]]);
testProgram('[1 2 3 4 5 6] [ _i 2 mod 1 = ] split', [[2, 4, 6], [1, 3, 5]]);
testProgram('[1 2 3 4 5 6] [ _a _i at = ] split', [[1, 2, 3, 4, 5, 6], []]);
testProgram('[] [ true ] split', [[], []]);
// 'some'
testProgram('[1 2 3 4 5] [3 =] some', [true]);
testProgram('[1 2 4 5] [3 =] some', [false]);
testProgram('[1 2 4 5] [ _i = ] some', [false]);
// 'all'
testProgram('[1 2 3 4 5] [3 =] all', [false]);
testProgram('[3 3 3 3] [3 =] all', [true]);
testProgram('[1 2 4 5] [ _i != ] all', [true]);

// bug-tests

testProgram(
  `
    halfWidth: 500 2 / ;
    negativeHalfWidth: halfWidth -1 * ;

    negativeHalfWidth halfWidth
  `,
  [-250, 250]
);

testProgram(
  `
    colorwheel: ["teal" "teal" "teal" "teal"] ;
    randomColor: 0 colorwheel size random2 floor colorwheel of ;

    randomColor
  `,
  ['teal']
);

testProgram(
  `
    gen:
      []
      10
      [ _i [] cons swappend ]
      times ;

    gen
  `,
  [[[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]]]
);

testProgram(
  `
    point: [] cons cons ;

    0 0 point
    0 1 point
  `,
  [[0, 0], [0, 1]]
);

testProgram(
  `
  filterFn: [ 3 > ] ;
  [1 2 3 4 5 6] filterFn filter
  filterFn
  `,
  [[4, 5, 6], [3, '>']]
);
