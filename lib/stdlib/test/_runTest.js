import test from 'ava';
import BaseRuntime from '../../runtime/runtime';

function internalTestProgram(fn, program, expectedStack) {
  fn(
    `Evaluating "${program}" should yield ${JSON.stringify(expectedStack)}`,
    function(t) {
      t.plan(1);
      const runtime = new BaseRuntime();
      runtime.evaluate(program);
      t.deepEqual(runtime.stack.stack(), expectedStack);
    }
  );
}

export function testProgram(program, expectedStack) {
  internalTestProgram(test, program, expectedStack);
}

testProgram.only = function(program, expectedStack) {
  internalTestProgram(test.only, program, expectedStack);
};

export function testProgramShouldThrow(program) {
  test(`Evaluating "${program}" should throw`, function(t) {
    t.plan(1);
    const runtime = new BaseRuntime();
    t.throws(() => runtime.evaluate(program));
  });
}
