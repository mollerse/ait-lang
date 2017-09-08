import { testProgram } from './_runTest';

testProgram('[2 3] exec', [2, 3]);
testProgram('1 [2 3] nullary', [1, 3]);
testProgram('1 2 [3 4] unary', [1, 4]);
testProgram('1 2 3 [4 5] binary', [1, 5]);
testProgram('1 2 [+] nullary', [1, 2, 3]);
testProgram('[1 2] [ dup pop ] nullary', [[1, 2], [1, 2]]);
testProgram('[1 2] [ dup pop pop ] nullary', [[1, 2]]);
testProgram('1 1 [ dup pop [pop] unary ] nullary', [1, 1, 1]);
testProgram('1 2 [+] unary', [1, 3]);
testProgram('1 2 [+] binary', [3]);
testProgram('1 2 [ [+] unary ] nullary', [1, 2, 3]);
testProgram('1 2 [ [+] binary ] nullary', [1, 2, 3]);
testProgram('1 2 [ [+] binary ] unary', [1, 3]);
testProgram('1 2 [ [+] nullary ] unary', [1, 3]);
testProgram('1 2 [ [+] nullary ] binary', [3]);
testProgram('1 2 [ [+] nullary 4 ] binary', [4]);
testProgram('1 2 [ [ + ] nullary  1 ] unary', [1, 1]);
testProgram('false 2 [ 2 = || ] binary', [true]);
testProgram('1 2 [ 3 [ + ] nullary ] unary', [1, 5]);
testProgram('1 2 3 4 [ + + + ] nullary', [1, 2, 3, 4, 10]);
testProgram('[1 2 3 4] 0 [ at ] nullary', [[1, 2, 3, 4], 0, 1]);
testProgram('[] 1 [ [ size 0 = ] dip swap ] nullary', [[], 1, true]);
// dip
testProgram('0 2 [1 +] dip', [1, 2]);
testProgram('[1] 2 [3 swons] dip', [[3, 1], 2]);
// cleave
testProgram('1 [1 +] [2 +] cleave', [2, 3]);
