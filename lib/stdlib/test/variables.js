import { testProgram, testProgramShouldThrow } from './_runTest';

testProgram(
  `
    1 -> a
    a
  `,
  [1]
);

testProgram(
  `
    [ 1 -> a a ] exec
  `,
  [1]
);

testProgram(
  `
    1 -> a
    [ a ] exec
  `,
  [1]
);

testProgram(
  `
    1 -> a
    [ [a] exec ] exec
  `,
  [1]
);

testProgram(
  `
    1 -> a
    [ 2 -> b [a b] exec ] exec
  `,
  [1, 2]
);

testProgram(
  `
    1 -> a
    [ 2 -> a [a] exec ] exec
  `,
  [2]
);

testProgram(
  `
    [1] -> a
    2 a append
  `,
  [[1, 2]]
);

testProgram(
  `
    [1] -> a
    2 a append
    a
  `,
  [[1, 2], [1, 2]]
);

testProgram(
  `
    makeA: -> a a ;
    24 makeA
  `,
  [24]
);

testProgram(
  `
    makeA: -> a [a] ;
    24 makeA
    2 -> a
    exec
  `,
  [2]
);

// Testing modification of variable state
testProgram(
  `
    [ 1 2 3 ] -> A
    6 A 1 ins pop
    A
  `,
  [[1, 6, 3]]
);

testProgram(
  `
    [ [1] [2] [3] ] -> A
    6 1 A of 0 ins pop
    A
  `,
  [[[1], [6], [3]]]
);

testProgram(
  `
    0 -> a
    6
    [_i a + ->> a]
    times
    a
  `,
  [15]
);

testProgram(
  `
    add1: a 1 + ->> a ;
    sub1: a 1 - ->> a ;
    0 -> a
    add1 add1 sub1 sub1 add1
    a
  `,
  [1]
);

testProgram(
  `
    init: 0 ->> a ;
    add1: a 1 + ->> a ;
    sub1: a 1 - ->> a ;

    init
    add1 add1 sub1 sub1 add1
    a
  `,
  [1]
);

testProgramShouldThrow(
  `
    add1: a 1 + ->> a ;

    add1
  `,
  [1]
);

testProgramShouldThrow(
  `
    makeA: -> a a ;
    24 makeA
    a
  `
);

testProgramShouldThrow(
  `
    makeA: -> a [a] ;
    24 makeA
    exec
  `
);

testProgramShouldThrow(
  `
  [ 1 -> a a ] exec
  b
`
);

testProgramShouldThrow(
  `
  [ 1 -> a a ] exec
  a
`
);
