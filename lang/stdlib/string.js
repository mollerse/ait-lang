module.exports = {
  'replace': function replace(context) {
    var stack = context.stack;
    var string = stack.pop();
    var replacement = stack.pop();
    stack.push(string.replace(/%s/, replacement));
  },
};
