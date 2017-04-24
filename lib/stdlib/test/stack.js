import { testProgram, testProgramShouldThrow } from './_runTest';

testProgram('1 2 pop', [1]);
testProgram('[1] [2] pop', [[1]]);
testProgram('[1] [2] swap', [[2], [1]]);
testProgram('1 2 swap', [2, 1]);
