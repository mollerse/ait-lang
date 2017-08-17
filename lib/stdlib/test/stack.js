import { testProgram } from './_runTest';

testProgram('1 2 dup', [1, 2, 2]);
testProgram('[1] [2] dup', [[1], [2], [2]]);
testProgram('1 2 3 dupd', [1, 2, 2, 3]);
testProgram('[1] [2] [3] dupd', [[1], [2], [2], [3]]);

testProgram('1 2 pop', [1]);
testProgram('[1] [2] pop', [[1]]);
testProgram('1 2 3 popd', [1, 3]);
testProgram('[1] [2] [3] popd', [[1], [3]]);

testProgram('[1] [2] swap', [[2], [1]]);
testProgram('1 2 swap', [2, 1]);
testProgram('isEmpty: size 0 = ; [] 1 swap isEmpty', [1, true]);
testProgram('[1] [2] [3] swapd', [[2], [1], [3]]);
testProgram('1 2 3 swapd', [2, 1, 3]);

testProgram('[1] [2] [3] rollup', [[2], [3], [1]]);
testProgram('1 2 3 rollup', [2, 3, 1]);
testProgram('[1] [2] [3] [4] rollupd', [[2], [3], [1], [4]]);
testProgram('1 2 3 4 rollupd', [2, 3, 1, 4]);

testProgram('[1] [2] [3] rolldown', [[3], [1], [2]]);
testProgram('1 2 3 rolldown', [3, 1, 2]);
testProgram('[1] [2] [3] [4] rolldownd', [[3], [1], [2], [4]]);
testProgram('1 2 3 4 rolldownd', [3, 1, 2, 4]);

testProgram('[1] [2] [3] rotate', [[3], [2], [1]]);
testProgram('1 2 3 rotate', [3, 2, 1]);
testProgram('[1] [2] [3] [4] rotated', [[3], [2], [1], [4]]);
testProgram('1 2 3 4 rotated', [3, 2, 1, 4]);

testProgram('1 2 3 4 stack', [1, 2, 3, 4, [1, 2, 3, 4]]);
testProgram('1 2 3 4 [] unstack', []);

// Accidental mutation tests for dup
testProgram('[] dup 1 swons', [[], [1]]);
testProgram('"asdft %s" dup "derp" swap replace', ['asdft %s', 'asdft derp']);
testProgram('"asdf" dup "1" +', ['asdf', 'asdf1']);
// Accidental mutation tests for dupd
testProgram('[] "dummy" dupd [1 swons] dip', [[], [1], 'dummy']);
testProgram('"asdft %s" "dummy" dupd ["derp" swap replace] dip', [
  'asdft %s',
  'asdft derp',
  'dummy'
]);
testProgram('"asdf" "dummy" dupd ["1" +] dip', ['asdf', 'asdf1', 'dummy']);
