import { testProgram, testProgramShouldThrow } from './_runTest';

// 'uncons'
testProgram('[1 2] uncons', [1, [2]]);
testProgram('[1] uncons', [1, []]);
testProgram('[[1 2] 3] uncons', [[1, 2], [3]]);
testProgramShouldThrow('[] uncons');
testProgramShouldThrow('"asdf" uncons');
// 'unswons'
testProgram('[1 2] unswons', [[2], 1]);
testProgram('[1] unswons', [[], 1]);
testProgram('[[1 2] 3] unswons', [[3], [1, 2]]);
testProgramShouldThrow('[] unswons');
testProgramShouldThrow('"asdf" unswons');
// 'concat'
testProgram('[] [] concat', [[]]);
testProgram('[1] [2] concat', [[1, 2]]);
testProgram('[2] [1] concat', [[2, 1]]);
testProgram('[1] 2 concat', [[1, 2]]);
testProgram('[1] "asdf" concat', [[1, 'asdf']]);
testProgram('[] 1 concat', [[1]]);
testProgramShouldThrow('1 2 concat');
testProgramShouldThrow('"asdf" [2] concat');
testProgramShouldThrow('1 [2] concat');
// 'cons'
testProgram('[] [] cons', [[[]]]);
testProgram('[1] [2] cons', [[[1], 2]]);
testProgram('[2] [1] cons', [[[2], 1]]);
testProgram('1 [2] cons', [[1, 2]]);
testProgram('2 [1] cons', [[2, 1]]);
testProgram('2 ["asdf"] cons', [[2, 'asdf']]);
testProgramShouldThrow('1 2 cons');
testProgramShouldThrow('[] 1 cons');
testProgramShouldThrow('[1] 2 cons');
testProgramShouldThrow('1 "asdf" cons');
// 'swons'
testProgram('[] [] swons', [[[]]]);
testProgram('[1] [2] swons', [[[2], 1]]);
testProgram('[2] [1] swons', [[[1], 2]]);
testProgram('[2] 1 swons', [[1, 2]]);
testProgram('[1] 2 swons', [[2, 1]]);
testProgram('["asdf"] 2 swons', [[2, 'asdf']]);
testProgramShouldThrow('1 2 swons');
testProgramShouldThrow('1 [] swons');
testProgramShouldThrow('2 [1] swons');
testProgramShouldThrow('"asdf" 1 swons');
// 'append'
testProgram('[] [] append', [[[]]]);
testProgram('[1] [2] append', [[2, [1]]]);
testProgram('[2] [1] append', [[1, [2]]]);
testProgram('1 [2] append', [[2, 1]]);
testProgram('2 [1] append', [[1, 2]]);
testProgram('2 ["asdf"] append', [['asdf', 2]]);
testProgramShouldThrow('1 2 append');
testProgramShouldThrow('[] 1 append');
testProgramShouldThrow('[1] 2 append');
testProgramShouldThrow('1 "asdf" append');
// 'swappend'
testProgram('[] [] swappend', [[[]]]);
testProgram('[1] [2] swappend', [[1, [2]]]);
testProgram('[2] [1] swappend', [[2, [1]]]);
testProgram('[2] 1 swappend', [[2, 1]]);
testProgram('[1] 2 swappend', [[1, 2]]);
testProgram('["asdf"] 2 swappend', [['asdf', 2]]);
testProgramShouldThrow('1 2 swappend');
testProgramShouldThrow('1 [] swappend');
testProgramShouldThrow('2 [1] swappend');
testProgramShouldThrow('"asdf" 1 swappend');
// 'first'
testProgram('[1] first', [[1], 1]);
testProgram('[1 2] first', [[1, 2], 1]);
testProgram('[1 2 3] first', [[1, 2, 3], 1]);
testProgram('[[1 2 3]] first', [[[1, 2, 3]], [1, 2, 3]]);
testProgramShouldThrow('[] first');
testProgramShouldThrow('1 first');
testProgramShouldThrow('"asdf" first');
// 'last'
testProgram('[1] last', [[1], 1]);
testProgram('[1 2] last', [[1, 2], 2]);
testProgram('[1 2 3] last', [[1, 2, 3], 3]);
testProgram('[[1 2 3]] last', [[[1, 2, 3]], [1, 2, 3]]);
testProgramShouldThrow('[] last');
testProgramShouldThrow('1 last');
testProgramShouldThrow('"asdf" last');
// 'rest'
testProgram('[1] rest', [[]]);
testProgram('[1 2] rest', [[2]]);
testProgram('[1 2 3] rest', [[2, 3]]);
testProgramShouldThrow('[] rest');
testProgramShouldThrow('1 rest');
testProgramShouldThrow('"asdf" rest');
// 'at'
testProgram('[1 2] 1 at', [[1, 2], 2]);
testProgram('[1 2] 0 at', [[1, 2], 1]);
testProgram('[[1 2] 3] 0 at', [[[1, 2], 3], [1, 2]]);
testProgramShouldThrow('[1 2] 2 at');
testProgramShouldThrow('[] 0 at');
testProgramShouldThrow('"asdf" 0 at');
testProgramShouldThrow('1 0 at');
testProgramShouldThrow('true 0 at');
// 'of'
testProgram('1 [1 2] of', [[1, 2], 2]);
testProgram('0 [1 2] of', [[1, 2], 1]);
testProgram('0 [[1 2] 3] of', [[[1, 2], 3], [1, 2]]);
testProgramShouldThrow('2 [1 2] at');
testProgramShouldThrow('0 [] at');
testProgramShouldThrow('0 "asdf" at');
testProgramShouldThrow('0 1 at');
testProgramShouldThrow('0 true at');
// 'ins'
testProgram('3 [1 2] 1 ins', [[1, 3]]);
testProgram('3 [1 2] 0 ins', [[3, 2]]);
testProgram('2 [1 4 3] 1 ins', [[1, 2, 3]]);
// 'size'
testProgram('[] size', [0]);
testProgram('[1] size', [1]);
testProgram('[1 2] size', [2]);
testProgram('[1 2 3] size', [3]);
testProgramShouldThrow('"asdf" size');
testProgramShouldThrow('1 size');
testProgramShouldThrow('true size');
// 'drop'
testProgram('[] 0 drop', [[]]);
testProgram('[1] 1 drop', [[]]);
testProgram('[1] 0 drop', [[1]]);
testProgram('[1 2] 1 drop', [[2]]);
testProgram('[1 2 3] 1 drop', [[2, 3]]);
testProgram('[] 1 drop', [[]]);
testProgram('[1] 2 drop', [[]]);
testProgramShouldThrow('1 1 drop');
testProgramShouldThrow('true 1 drop');
testProgramShouldThrow('"asdf" 1 drop');
// 'take'
testProgram('[] 0 take', [[]]);
testProgram('[1] 1 take', [[1]]);
testProgram('[1] 0 take', [[]]);
testProgram('[1 2] 1 take', [[1]]);
testProgram('[1 2 3] 1 take', [[1]]);
testProgram('[1 2 3] 2 take', [[1, 2]]);
testProgram('[] 1 take', [[]]);
testProgram('[1] 2 take', [[1]]);
testProgramShouldThrow('1 1 take');
testProgramShouldThrow('true 1 take');
testProgramShouldThrow('"asdf" 1 take');
// 'step'
testProgram('[1] [ 1 + ] step', [2]);
testProgram('[1 2 3] [ 1 + ] step', [2, 3, 4]);
testProgram('[] [ 1 + ] step', []);
testProgram('[1 2 3] [ dup ] step', [1, 1, 2, 2, 3, 3]);
testProgram('[1 2 3] [] step', [1, 2, 3]);
testProgramShouldThrow('true [] step');
testProgramShouldThrow('1 [] step');
testProgramShouldThrow('"asdf" [] step');
testProgramShouldThrow('[] 1 step');
testProgramShouldThrow('[] true step');
testProgramShouldThrow('[] "asdf" step');
// 'map'
testProgram('[1] [ 1 + ] map', [[2]]);
testProgram('[1 2 3] [ 1 + ] map', [[2, 3, 4]]);
testProgram('[] [ 1 + ] map', [[]]);
testProgramShouldThrow('[1 2 3] [] map');
testProgramShouldThrow('true [] map');
testProgramShouldThrow('1 [] map');
testProgramShouldThrow('"asdf" [] map');
testProgramShouldThrow('[] 1 map');
testProgramShouldThrow('[] true map');
testProgramShouldThrow('[] "asdf" map');
// 'map2'
testProgram('[1] [1] [ + ] map2', [[2]]);
testProgram('[1 2 3] [1 2 3] [ + ] map2', [[2, 4, 6]]);
testProgram('[1] [] [ + ] map2', [[]]);
testProgram('[1 2 3] [1 2] [ + ] map2', [[2, 4]]);
testProgramShouldThrow('[1 2 3] [1 2 3] [] map2');
testProgramShouldThrow('[1 2] [1 2 3] [] map2');
testProgramShouldThrow('[] [1] [ + ] map2');
testProgramShouldThrow('[] true [] map2');
testProgramShouldThrow('true [] [] map2');
testProgramShouldThrow('[] 1 [] map2');
testProgramShouldThrow('1 [] [] map2');
testProgramShouldThrow('[] "asdf" [] map2');
testProgramShouldThrow('"asdf" [] [] map2');
testProgramShouldThrow('[] [] 1 map2');
testProgramShouldThrow('[] true map2');
testProgramShouldThrow('[] [] true map2');
testProgramShouldThrow('[] "asdf" map2');
testProgramShouldThrow('[] [] "asdf" map2');
// 'fold'
testProgram('[1] [] [ 1 + concat ] fold', [[2]]);
testProgram('[1 2 3] [] [ 1 + concat ] fold', [[2, 3, 4]]);
testProgram('[] [] [ 1 + concat ] fold', [[]]);
testProgram('[1 2 3] 0 [ + ] fold', [6]);
testProgramShouldThrow('[1 2 3] [] [] fold');
testProgramShouldThrow('true [] [] fold');
testProgramShouldThrow('1 [] [] fold');
testProgramShouldThrow('"asdf" [] [] fold');
testProgramShouldThrow('[] [] 1 fold');
testProgramShouldThrow('[] [] true fold');
testProgramShouldThrow('[] [] "asdf" fold');
