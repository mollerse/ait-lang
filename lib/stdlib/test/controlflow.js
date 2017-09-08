import { testProgram } from './_runTest';

// 'ifte'
testProgram('[true] [0] [1] ifte', [0]);
testProgram('[false] [0] [1] ifte', [1]);
// 'branch'
testProgram('true [0] [1] branch', [0]);
testProgram('1 [0] [1] branch', [0]);
testProgram('"asdf" [0] [1] branch', [0]);
testProgram('true [] [] branch', []);
testProgram('false [0] [1] branch', [1]);
testProgram('0 [0] [1] branch', [1]);
testProgram('"" [0] [1] branch', [1]);
// 'cond'
testProgram('true [0] cond', [0]);
testProgram('false [0] cond', []);
testProgram('"asdf" [0] cond', [0]);
testProgram('true [] cond', []);
testProgram('0 [0] cond', []);
testProgram('"" [0] cond', []);
