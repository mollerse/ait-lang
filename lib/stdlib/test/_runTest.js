import test from 'ava';
import BaseRuntime from '../../runtime/runtime';
import { unwrapValueInternal } from '../../parser/ast-walkers';

function internalTestProgram(fn, program, expectedStack) {
  fn(`Evaluating "${program}" should yield ${JSON.stringify(expectedStack)}`, function(t) {
    t.plan(1);
    const runtime = new BaseRuntime();
    runtime.evaluate(program);
    t.deepEqual(runtime.stack.stack().map(unwrapValueInternal), expectedStack);
  });
}

export function testProgram(program, expectedStack) {
  internalTestProgram(test, program, expectedStack);
}

testProgram.only = function(program, expectedStack) {
  internalTestProgram(test.only, program, expectedStack);
};

function internalTestProgramShouldThrow(fn, program) {
  fn(`Evaluating "${program}" should throw`, function(t) {
    t.plan(1);
    const runtime = new BaseRuntime();
    t.throws(() => runtime.evaluate(program));
  });
}

export function testProgramShouldThrow(program) {
  internalTestProgramShouldThrow(test, program);
}

testProgramShouldThrow.only = function(program) {
  internalTestProgramShouldThrow(test.only, program);
};

function internalTestProgramAssertOnTop(fn, program, assertion) {
  fn(
    `Evaluating "${program}" should yield top of stack satisfying assertion ${assertion.toString()}`,
    function(t) {
      t.plan(1);
      const runtime = new BaseRuntime();
      runtime.evaluate(program);
      t.true(assertion(unwrapValueInternal(runtime.stack.stack().pop())));
    }
  );
}

export function testProgramAssertOnTop(program, assertion) {
  internalTestProgramAssertOnTop(test, program, assertion);
}

testProgramAssertOnTop.only = function(program, assertion) {
  internalTestProgramAssertOnTop(test.only, program, assertion);
};
