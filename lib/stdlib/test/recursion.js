import { testProgram } from './_runTest';

// linrec
testProgram('7 [zero] [succ] [dup pred] [*] linrec', [5040]);
testProgram('0 [zero] [succ] [dup pred] [*] linrec', [1]);
// tailrec
testProgram('0 6 [zero] [+] [ pred dup [+] dip ] tailrec', [15]);
testProgram('0 [1 2 3 4 5] [zero] [ pop ] [ uncons [+] dip ] tailrec', [15]);
// binrec
testProgram('[2 4 6 8 1 3 5 7 9] [small] [] [uncons [>] split] [enconcat] binrec', [
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
]);
