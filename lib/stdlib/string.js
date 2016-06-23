const {binary} = require('../runtime/interfaces');

module.exports = {
  replace: binary(function(replacement, string) {
    return string.replace(/%s/, replacement);
  })
};
