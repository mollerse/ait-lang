import { testProgram } from './_runTest';

// 'while'
testProgram('0 [ 10 < ] [ 1 + ] while', [10]);
testProgram('[[1 2 3]] 0 [ 1 < ] [ [ at ] nullary swap 1 + ] while', [[[1, 2, 3]], [1, 2, 3], 1]);
testProgram('false [] [] while', []);
testProgram('0 10 [ 1 + ] times', [10]);

//Testing loop counter as variable
testProgram('10 [ _i ] times', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
