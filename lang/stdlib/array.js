module.exports = {
  '<0': function(stack) {
    var el = stack.pop();
    var list = stack.pop();
    list[0] = el;
    stack.push(list);
  },
  '<1': function(stack) {
    var el = stack.pop();
    var list = stack.pop();
    list[1] = el;
    stack.push(list);
  },
  '0>': function(stack) {
    var list = stack.pop();
    stack.push(list[0]);
  },
  '1>': function(stack) {
    var list = stack.pop();
    stack.push(list[1]);
  }
};
