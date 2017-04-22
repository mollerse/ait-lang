import {testProgram, testProgramShouldThrow} from './_runTest';

// 'while'
testProgram('0 [ dup 10 < ] [1 + ] while', [10]);
testProgram('false [] [] while', []);
testProgramShouldThrow('[] [] while');
testProgramShouldThrow('"asdf" [] while');
testProgramShouldThrow('[] "asdf" while');
testProgramShouldThrow('1 "asdf" while');
testProgramShouldThrow('1 [] while');
