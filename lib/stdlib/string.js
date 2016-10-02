import jsword from '../runtime/jsword';

module.exports = {
  replace: jsword(function(string, replacement) {
    return string.replace(/%s/, replacement);
  }, 'replace'),
  replace2: jsword(function(string, r1, r2) {
    return string.replace(/%s/, r1).replace(/%s/, r2);
  }, 'replace2'),
  replace3: jsword(function(string, r1, r2, r3) {
    return string.replace(/%s/, r1).replace(/%s/, r2).replace(/%s/, r3);
  }, 'replace3')
};
