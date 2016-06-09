module.exports = {
  'replace': function replace({stack}) {
    const string = stack.pop();
    const replacement = stack.pop();
    stack.push(string.replace(/%s/, replacement));
  },
};
