import jsword from '../runtime/jsword';

module.exports = {
  get: jsword(function(key, record) {
    return record[key];
  }, 'get'),
  with: jsword(function(tuple, record) {
    return Object.assign({}, record, tuple);
  }, 'with'),
  make: jsword(function(value, key) {
    return { [key]: value };
  }, 'make')
};
