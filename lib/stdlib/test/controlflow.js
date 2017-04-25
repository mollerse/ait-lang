import { testProgram, testProgramShouldThrow } from './_runTest';

// 'ifte'
testProgram('[true] [0] [1] ifte', [0]);
testProgram('[false] [0] [1] ifte', [1]);
testProgramShouldThrow('1 [] [] ifte');
testProgramShouldThrow('[] 1 [] ifte');
testProgramShouldThrow('[] [] 1 ifte');
testProgramShouldThrow('"asdf" [] [] ifte');
testProgramShouldThrow('[] "asdf" [] ifte');
testProgramShouldThrow('[] [] "asdf" ifte');
testProgramShouldThrow('true [] [] ifte');
testProgramShouldThrow('[] true [] ifte');
testProgramShouldThrow('[] [] true ifte');
