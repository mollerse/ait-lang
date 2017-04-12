import jsword from '../runtime/jsword';

module.exports = {
  replace: jsword('replace', function(string, replacement) {
    return string.replace(/%s/, replacement);
  }),
  replace2: jsword('replace2', function(string, r1, r2) {
    return string.replace(/%s/, r1).replace(/%s/, r2);
  }),
  replace3: jsword('replace3', function(string, r1, r2, r3) {
    return string.replace(/%s/, r1).replace(/%s/, r2).replace(/%s/, r3);
  })
};
