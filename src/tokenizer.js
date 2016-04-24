// token -> List<Fragment>
function fagment(token) {
  return token.split(' ')
  //Remove extraneous whitespace and newlines
    .filter(t => !!t)
    .map(t => t.trim());
}

// string -> List<Token>
module.exports.tokenize = function tokenize(source) {
  return source
    .split(';')
    .filter(c => !!c.trim()) //Clear newlines and other empty lines
    .map(fagment)
};
