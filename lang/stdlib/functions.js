module.exports = {
  unary: function unary(context) {
    var stack = context.stack;
    var quotation = stack.pop();
    //TODO: Implement evaluate and do quotation.call(null, stack);
  }
};

module.exports.genericNullary = function genericNullary(fn) {
  return function(context) {
    var stack = context.stack;
    stack.push(fn());
  }
};

module.exports.genericUnary = function genericUnary(fn) {
  return function(context) {
    var stack = context.stack;
    var a = stack.pop();

    stack.push(fn(a));
  }
};

module.exports.genericBinary = function genericBinary(fn) {
  return function(context) {
    var stack = context.stack;
    var b = stack.pop();
    var a = stack.pop();

    stack.push(fn(a,b));
  }
};

module.exports.genericTernary = function genericTernary(fn) {
  return function(context) {
    var stack = context.stack;
    var c = stack.pop();
    var b = stack.pop();
    var a = stack.pop();

    stack.push(fn(a,b,c));
  }
};
