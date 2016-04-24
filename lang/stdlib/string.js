module.exports = {
  'replace': function replace(stack) {
    var string = stack.pop();
    var replacement = stack.pop();
    stack.push(string.replace(/%s/, replacement));
  },
};
