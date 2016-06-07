const {
  startsWith,
  endsWith,
  contains,
  splitOnFirstOf
} = sh = require('./stringhelpers');

const isComment = startsWith.bind(null, '//');
const isBlockTerminator = endsWith.bind(null, ';');

const isQuotationStart = startsWith.bind(null, '[');
const isTupleStart = startsWith.bind(null, '(');
const isStringStart = startsWith.bind(null, '"');

const containsQuotationEnd = contains.bind(null, ']');
const containsTupleEnd = contains.bind(null, ')');
const containsStringEnd = contains.bind(null, '"');

const splitOnFirstQuotationEnd = splitOnFirstOf.bind(null, ']');
const splitOnFirstTupleEnd = splitOnFirstOf.bind(null, ')');
const splitOnFirstStringEnd = splitOnFirstOf.bind(null, '"');

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

    let parts;

    if(containsQuotationEnd(token)) {
      parts = splitOnFirstQuotationEnd(token);
      fragments.push(parts[0]);
      fragments.push(parts[1]);
      return _toFragment(parts[2], fragments);
    }

    if(containsTupleEnd(token)) {
      parts = splitOnFirstTupleEnd(token);
      fragments.push(parts[0]);
      fragments.push(parts[1]);
      return _toFragment(parts[2], fragments);
    }

    if(containsStringEnd(token)) {
      parts = splitOnFirstStringEnd(token);
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

    const line = lines.pop();

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
  const lines = source
    .split('\n')
    .filter(c => !!c.trim());

  return toBlocks(lines)
    .map(toTokens);
};
