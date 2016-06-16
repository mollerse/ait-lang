const {unary, binary} = require('../runtime/interfaces');

module.exports = {
  '<0': binary(function(list, el) {
    list[0] = el;
    return list;
  }),
  '<1': binary(function(list, el) {
    list[1] = el;
    return list;
  }),
  '0>': unary(list => list[0]),
  '1>': unary(list => list[1])
};
