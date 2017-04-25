import { testProgram } from './_runTest';

// 'while'
testProgram('"a" "%s" replace', ['a']);
testProgram('"a" "b" "%s%s" replace2', ['ba']);
testProgram('"a" "b" "c" "%s%s%s" replace3', ['cba']);
testProgram('"a" "b" "%s" replace2', ['b']);
testProgram('"a" "b" "c" "%s" replace3', ['c']);
testProgram('"a" "b" "c" "%s%s" replace3', ['cb']);
