module.exports = {};

module.exports.genericNullary = function genericNullary(fn) {
  return function({stack}) {
    stack.push(fn());
  }
};

module.exports.genericUnary = function genericUnary(fn) {
  return function({stack}) {
    const a = stack.pop();

    stack.push(fn(a));
  }
};

module.exports.genericBinary = function genericBinary(fn) {
  return function({stack}) {
    const b = stack.pop();
    const a = stack.pop();

    stack.push(fn(a,b));
  }
};

module.exports.genericTernary = function genericTernary(fn) {
  return function({stack}) {
    const c = stack.pop();
    const b = stack.pop();
    const a = stack.pop();

    stack.push(fn(a,b,c));
  }
};
