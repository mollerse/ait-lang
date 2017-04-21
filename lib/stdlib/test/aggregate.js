import {testProgram, testProgramShouldThrow} from './_runTest';

// 'uncons'
testProgram('[1 2] uncons', [1, [2]]);
testProgram('[1] uncons', [1, []]);
testProgramShouldThrow('[] uncons');
testProgramShouldThrow('"asdf" uncons');
// 'unswons'
testProgram('[1 2] unswons', [[2], 1]);
testProgram('[1] unswons', [[], 1]);
testProgramShouldThrow('[] unswons');
testProgramShouldThrow('"asdf" unswons');
// 'concat'
testProgram('[] [] concat', [[]]);
testProgram('[1] [2] concat', [[1,2]]);
testProgram('[2] [1] concat', [[2,1]]);
testProgram('[1] 2 concat', [[1,2]]);
testProgram('[1] "asdf" concat', [[1,"asdf"]]);
testProgram('[] 1 concat', [[1]]);
testProgramShouldThrow('1 2 concat');
testProgramShouldThrow('"asdf" [2] concat');
testProgramShouldThrow('1 [2] concat');
// 'cons'
testProgram('[] [] cons', [[[]]]);
testProgram('[1] [2] cons', [[[1],2]]);
testProgram('[2] [1] cons', [[[2],1]]);
testProgram('1 [2] cons', [[1, 2]]);
testProgram('2 [1] cons', [[2, 1]]);
testProgram('2 ["asdf"] cons', [[2, "asdf"]]);
testProgramShouldThrow('1 2 cons');
testProgramShouldThrow('[] 1 cons');
testProgramShouldThrow('[1] 2 cons');
testProgramShouldThrow('1 "asdf" cons');
// 'swons'
testProgram('[] [] swons', [[[]]]);
testProgram('[1] [2] swons', [[[2],1]]);
testProgram('[2] [1] swons', [[[1],2]]);
testProgram('[2] 1 swons', [[1, 2]]);
testProgram('[1] 2 swons', [[2, 1]]);
testProgram('["asdf"] 2 swons', [[2, "asdf"]]);
testProgramShouldThrow('1 2 swons');
testProgramShouldThrow('1 [] swons');
testProgramShouldThrow('2 [1] swons');
testProgramShouldThrow('"asdf" 1 swons');
// 'first'
testProgram('[1] first', [1]);
testProgram('[1 2] first', [1]);
testProgram('[1 2 3] first', [1]);
testProgramShouldThrow('[] first');
testProgramShouldThrow('1 first');
testProgramShouldThrow('"asdf" first');
// 'rest'
testProgram('[1] rest', [[]]);
testProgram('[1 2] rest', [[2]]);
testProgram('[1 2 3] rest', [[2,3]]);
testProgramShouldThrow('[] rest');
testProgramShouldThrow('1 rest');
testProgramShouldThrow('"asdf" rest');
// 'at'
testProgram('[1 2] 1 at', [2]);
testProgram('[1 2] 0 at', [1]);
testProgramShouldThrow('[1 2] 2 at');
testProgramShouldThrow('[] 0 at');
testProgramShouldThrow('"asdf" 0 at');
testProgramShouldThrow('1 0 at');
testProgramShouldThrow('true 0 at');
// 'ins'
testProgram('3 [1 2] 1 ins', [[1,3]]);
testProgram('3 [1 2] 0 ins', [[3,2]]);
testProgram('2 [1 4 3] 1 ins', [[1,2,3]]);
// 'of'
testProgram('1 [1 2] of', [2]);
testProgram('0 [1 2] of', [1]);
// 'size'
testProgram('[] size', [0]);
testProgram('[1] size', [1]);
testProgram('[1 2] size', [2]);
testProgram('[1 2 3] size', [3]);
testProgram('"asdf" size', [4]);
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
testProgram('[1 2 3] 2 take', [[1,2]]);
testProgramShouldThrow('[] 1 take');
testProgramShouldThrow('[1] 2 take');
testProgramShouldThrow('1 1 take');
testProgramShouldThrow('true 1 take');
testProgramShouldThrow('"asdf" 1 take');
// 'step'
testProgram('[1] [ 1 + ] step', [2]);
testProgram('[1 2 3] [ 1 + ] step', [2, 3, 4]);
testProgram('[] [ 1 + ] step', []);
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
testProgram('[1 2 3] [] map', [[1, 2, 3]]);
testProgramShouldThrow('true [] map');
testProgramShouldThrow('1 [] map');
testProgramShouldThrow('"asdf" [] map');
testProgramShouldThrow('[] 1 map');
testProgramShouldThrow('[] true map');
testProgramShouldThrow('[] "asdf" map');
