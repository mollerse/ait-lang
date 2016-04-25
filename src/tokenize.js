var sh = require('./stringhelpers');
var startsWith = sh.startsWith;
var endsWith = sh.endsWith;
var contains = sh.contains;
var splitOnFirstOf = sh.splitOnFirstOf;

var isComment = startsWith.bind(null, '//');
var isBlockTerminator = endsWith.bind(null, ';');

var isQuotationStart = startsWith.bind(null, '[');
var isTupleStart = startsWith.bind(null, '(');
var isStringStart = startsWith.bind(null, '"');

var containsQuotationEnd = contains.bind(null, ']');
var containsTupleEnd = contains.bind(null, ')');
var containsStringEnd = contains.bind(null, '"');

var splitOnFirstQuotationEnd = splitOnFirstOf.bind(null, ']');
var splitOnFirstTupleEnd = splitOnFirstOf.bind(null, ')');
var splitOnFirstStringEnd = splitOnFirstOf.bind(null, '"');

//Normalize syntax
function toFragments(token) {
  function _toFragment(token, fragments) {
    if(!token) {
      return fragments;
    }

    if(isQuotationStart(token)) {
      fragments.push('[');
      return _toFragment(token.slice(1), fragments);
    }
    if(isTupleStart(token)) {
      fragments.push('(');
      return _toFragment(token.slice(1), fragments);
    }

    if(containsQuotationEnd(token)) {
      var parts = splitOnFirstQuotationEnd(token);
      fragments.push(parts[0]);
      fragments.push(parts[1]);
      return _toFragment(parts[2], fragments);
    }

    if(containsTupleEnd(token)) {
      var parts = splitOnFirstTupleEnd(token);
      fragments.push(parts[0]);
      fragments.push(parts[1]);
      return _toFragment(parts[2], fragments);
    }

    if(containsStringEnd(token)) {
      var parts = splitOnFirstStringEnd(token);
      fragments.push(parts[0]);
      fragments.push(parts[1]);
      return _toFragment(parts[2], fragments);
    }

    //If the token is none of the above, then just return fragments
    fragments.push(token);
    return fragments;
  }

  return _toFragment(token, []);

}

function toTokens(block) {
  if(isComment(block)) {
    return [block.trim()];
  }

  return block.split(' ')
    .map(t => t.trim())
    .map(toFragments)
    .reduce((acc, list) => acc.concat(list), [])
    .filter(t => !!t);
}

function toBlocks(lines) {
  function _toBlocks(lines, block, blocks) {
    if(!lines.length) {
      if(block) { blocks.push(block); }
      return blocks;
    }

    var line = lines.pop();

    if(isComment(line)) {
      blocks.push(line);
      return _toBlocks(lines, '', blocks);
    } else if(isBlockTerminator(line)) {
      block += line.slice(0,-1); //Line - terminator
      blocks.push(block);
      return _toBlocks(lines, '', blocks);
    } else if(!block) {
      return _toBlocks(lines, line, blocks);
    } else {
      block += line;
      return _toBlocks(lines, block, blocks);
    }
  }

  return _toBlocks(lines.reverse(), '', []);
}

module.exports = function tokenize(source) {
  var lines = source
    .split('\n')
    .filter(c => !!c.trim());

  return toBlocks(lines)
    .map(toTokens);
};
