import { testProgram, testProgramShouldThrow } from './_runTest';

// 'while'
testProgram('0 [ dup 10 < ] [ 1 + ] while', [10]);
testProgram('[[1 2 3]] 0 [ dup 1 < ] [ [ at ] nullary swap 1 + ] while', [
  [[1, 2, 3]],
  [1, 2, 3],
  1
]);
testProgram('false [] [] while', []);
testProgramShouldThrow('[] [] while');
testProgramShouldThrow('"asdf" [] while');
testProgramShouldThrow('[] "asdf" while');
testProgramShouldThrow('1 "asdf" while');
testProgramShouldThrow('1 [] while');
testProgram('0 10 [ 1 + ] times', [10]);
