import { testProgram, testProgramShouldThrow } from './_runTest';

testProgram('1 [2 3] nullary', [1, 3]);
testProgram('1 2 [3 4] unary', [1, 4]);
testProgramShouldThrow('[3 4] unary');
testProgram('1 2 3 [4 5] binary', [1, 5]);
testProgramShouldThrow('3 [4 5] binary');
testProgramShouldThrow('3 4 [5 6] ternary');
testProgram('1 2 [+] nullary', [1, 2, 3]);
testProgram('[1 2] [ dup pop ] nullary', [[1, 2], [1, 2]]);
testProgram('[1 2] [ dup pop pop ] nullary', [[1, 2]]);
// Known bug, see tests for stack in runtime/tests/stack.js
// testProgram('[1 2] [ dup pop [ pop ] unary ] nullary', [[1, 2]]);
testProgram('1 2 [+] unary', [1, 3]);
testProgram('1 2 [+] binary', [3]);
testProgram('1 2 [ [+] unary ] nullary', [1, 2, 3]);
testProgram('1 2 [ [+] binary ] nullary', [1, 2, 3]);
testProgram('1 2 [ [+] binary ] unary', [1, 3]);
testProgram('1 2 [ [+] nullary ] unary', [1, 3]);
testProgram('1 2 [ [+] nullary ] binary', [3]);
testProgram('1 2 [ [+] nullary 4 ] binary', [4]);
testProgram('1 2 [ [ + ] nullary  1 ] unary', [1, 1]);
testProgram('1 2 [ 3 [ + ] nullary ] unary', [1, 5]);
testProgram('1 2 3 4 [ + + + ] nullary', [1, 2, 3, 4, 10]);
testProgram('[1 2 3 4] 0 [ at ] nullary', [[1, 2, 3, 4], 0, 1]);
