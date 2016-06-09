module.exports = {
  '<0': function({stack}) {
    const el = stack.pop();
    const list = stack.pop();
    list[0] = el;
    stack.push(list);
  },
  '<1': function({stack}) {
    const el = stack.pop();
    const list = stack.pop();
    list[1] = el;
    stack.push(list);
  },
  '0>': function({stack}) {
    const list = stack.pop();
    stack.push(list[0]);
  },
  '1>': function({stack}) {
    const list = stack.pop();
    stack.push(list[1]);
  }
};
