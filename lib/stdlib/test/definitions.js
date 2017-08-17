import { testProgram } from './_runTest';

testProgram(
  `
  test: 1 2 3 ;
  test
`,
  [1, 2, 3]
);

testProgram(
  `
  test: 1 2 3 ;
  test [ 4 5 6 ] exec
`,
  [1, 2, 3, 4, 5, 6]
);

testProgram(
  `
  test: 4 5 6 ;
  [ 1 2 3 ] exec test
`,
  [1, 2, 3, 4, 5, 6]
);
