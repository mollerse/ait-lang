module.exports.startsWith = function startsWith(substring, string) {
  return string.indexOf(substring) === 0;
};

module.exports.endsWith = function endsWith(substring, string) {
  return string.lastIndexOf(substring) === string.length - substring.length;
};

module.exports.contains = function contains(substring, string) {
  return string.indexOf(substring) > -1;
};

module.exports.splitOnFirstOf = function splitOnFirstOf(substring, string) {
  var first = string.slice(0, string.indexOf(substring));
  var second = string.slice(string.indexOf(substring) + 1);

  return [first, substring, second];
};
