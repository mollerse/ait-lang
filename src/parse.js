function findIndexOfClosingSign(opener, closer, words) {
  var opened = 0;
  for (var i = 0; i < words.length; i++) {
    if(words[i] === closer) {
      if(opened > 0) {
        opened -= 1;
      } else {
        return i;
      }
    } else if(words[i] === opener) {
      opened += 1;
    }
  }
}

var findIndexOfClosingBracket = findIndexOfClosingSign.bind(null, '[', ']');
var findIndexOfClosingParen = findIndexOfClosingSign.bind(null, '(', ')');

function parseLoad(body) {
  return {
    type: 'load',
    body: body[1]
  }
}

function parseComment(body) {
  return {
    type: 'comment',
    body: body.join(' ').slice(2).trim()
  }
}

function parseDefine(body) {
  return {
    type: 'define',
    body: {
      keyword: body[0].slice(0, -1),
      definition: parseWords(body.slice(1))
    }
  }
}

function parseWords(body) {
  function _parseWords(words, ast) {
    if(!words.length) {
      return ast;
    }

    var word = words.shift();
    var node;

    if(/^[\d\.\-]+$/.test(word) && !isNaN(parseFloat(word))) {
      ast.push({type: 'number', body: parseFloat(word)});
      return _parseWords(words, ast);
    }

    if(word === '[') {
      var i = findIndexOfClosingBracket(words);
      var wordsInsideQuote = words.slice(0, i);
      var wordsLeft = words.slice(i + 1);
      ast.push({
        type: 'quotation',
        body: parseWords(wordsInsideQuote)
      });
      return _parseWords(wordsLeft, ast);
    }

    if(word === '(') {
      var i = findIndexOfClosingParen(words);
      var wordsInsideParen = words.slice(0, i);
      var wordsLeft = words.slice(i + 1);
      ast.push({
        type: 'tuple',
        body: parseWords(wordsInsideParen)
      });
      return _parseWords(wordsLeft, ast);
    }

    if(word === '"') {
      var i = words.indexOf('"');
      var wordsLeft = words.slice(i + 1);
      ast.push({
        type: 'string',
        body: words.slice(0, i).join('')
      });
      return _parseWords(wordsLeft, ast);
    }

    ast.push({type: 'word', body: word});
    return _parseWords(words, ast);
  }

  return {
    type: 'words',
    body: _parseWords(body, [])
  };
}


var tokenTypes = {
  'load': parseLoad,
  'comment': parseComment,
  'define': parseDefine,
  'words': parseWords
}
module.exports = function parse(typedToken) {
  return tokenTypes[typedToken.type](typedToken.body);
}
