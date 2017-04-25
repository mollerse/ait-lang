// @flow

import type { Stack } from './types';

interface Consumable {
  _pop(): mixed,
  pop(): mixed,
  push(v: mixed): void,
  length(): number,
  _length(): number,
  stack(): Array<mixed>,
  _stack(): Array<mixed>,
  restack(s: Array<mixed>): void,
  resolve(): Array<mixed>
}

class Fork implements Consumable {
  toConsume: number;
  consumable: Consumable;
  consumed: Array<mixed>;
  internalStack: Array<mixed>;

  constructor(toConsume: number, consumable: Consumable) {
    this.toConsume = toConsume;
    this.consumable = consumable;
    this.consumed = [];
    this.internalStack = [];
  }

  length() {
    return this._length();
  }

  _length(): number {
    return (
      this.consumable._length() +
      Math.max(this.consumed.length, this.toConsume) +
      this.internalStack.length
    );
  }

  hasOwnElements() {
    return this.internalStack.length > 0;
  }

  hasElements() {
    return this.consumable._length() > 0;
  }

  _pop() {
    if (this.hasOwnElements()) {
      return this.internalStack.pop();
    } else if (this.hasElements()) {
      const el = this.consumable._pop();
      this.consumed.unshift(el);
      return el;
    } else {
      throw new Error('Cannot pop on empty stack');
    }
  }

  pop() {
    return this._pop();
  }

  push(el) {
    this.internalStack.push(el);
  }

  consumeAll() {
    for (var i = 0; i < this.toConsume; i++) {
      if (this.consumed.length > 0) {
        this.consumed.pop();
      } else if (this.hasElements()) {
        this.consumable._pop();
      } else {
        throw new Error('Cannot pop on empty stack');
      }
    }
  }

  _stack() {
    return this.consumable
      ._stack()
      .concat(this.consumed)
      .concat(this.internalStack);
  }

  stack() {
    return this._stack();
  }

  resolve() {
    this.consumeAll();

    let topOfOwnStack = [];
    if (this.hasOwnElements()) {
      topOfOwnStack = this.internalStack.pop();
      if (Array.isArray(topOfOwnStack)) {
        topOfOwnStack = [topOfOwnStack];
      }
    }

    return this.consumable._stack().concat(this.consumed).concat(topOfOwnStack);
  }

  restack(newStack) {
    this.internalStack = newStack;
  }
}

function forkFactory(toConsume: number, consumable: Consumable): Fork {
  return new Fork(toConsume, consumable);
}

class ForkableStack implements Consumable, Stack {
  internalStack: Array<mixed>;
  forks: Array<Consumable>;

  constructor() {
    this.internalStack = [];
    this.forks = [];
  }

  push(v: mixed) {
    if (this.hasForks()) {
      1;
      this.topFork().push(v);
    } else {
      this.internalStack.push(v);
    }
  }

  _pop() {
    if (this.hasElements()) {
      return this.internalStack.pop();
    }
    throw new Error('Cannot pop on empty stack');
  }

  pop() {
    if (this.hasForks()) {
      return this.topFork().pop();
    } else {
      return this._pop();
    }
  }

  hasForks() {
    return this.forks.length > 0;
  }

  topFork() {
    return this.forks[this.forks.length - 1];
  }

  hasElements() {
    return this.internalStack.length > 0;
  }

  fork(i: number = 0) {
    const fork = forkFactory(i, this.hasForks() ? this.topFork() : this);
    this.forks.push(fork);
  }

  resolve() {
    if (!this.hasForks()) {
      return [];
    }

    const forkToResolve = this.topFork();
    const newConsumable = forkToResolve.resolve();
    this.forks.pop();

    if (this.hasForks()) {
      this.topFork().restack(newConsumable);
    } else {
      this.restack(newConsumable);
    }

    return this.stack();
  }

  restack(newStack: Array<mixed>) {
    this.internalStack = newStack;
  }

  _length() {
    return this.internalStack.length;
  }

  length() {
    if (this.hasForks()) {
      return this.topFork().length();
    } else {
      return this._length();
    }
  }

  _stack() {
    return [...this.internalStack];
  }

  stack() {
    if (this.hasForks()) {
      return this.topFork().stack();
    } else {
      return this._stack();
    }
  }
}

export default function stackFactory(): Stack {
  return new ForkableStack();
}
