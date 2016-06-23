class Stack {
  constructor() {
    this.internalStack = [];
  }

  pop() {
    return this.internalStack.pop();
  }

  push(el) {
    this.internalStack.push(el);
  }

  copy() {
    return this.internalStack;
  }

  unstack() {
    this.internalStack = [];
  }

  join() {
    return this.internalStack.join();
  }

  stack() {
    return this.internalStack;
  }
}

module.exports = () => new Stack();
