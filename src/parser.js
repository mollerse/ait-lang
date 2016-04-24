function loadDirective(token) {
  return {
    type: 'load',
    body: token[1]
  }
}

function exportDirective(token) {
  return {
    type: 'export',
    body: token.slice(1)
  }
}

function comment(token) {
  return {
    type: 'comment',
    body: token.join(' ').slice(2)
  }
}

function define(token) {
  return {
    type: 'define',
    body: {
      keyword: token[0].slice(0, -1),
      definition: words(token.slice(1))
    }
  }
}

function words(token, type) {
  return {
    type: 'quotation',
    body: token
    .reduce(quotation, [])
    .reduce(tuple, [])
    .reduce(string, [])
    .map(word)
  };
}

function quotation(acc, token) {
  function findClosestOpenQuotation(list) {
    for (var i = list.length - 1; i > -1; i--) {
      if(typeof list[i] === 'object' && list[i].type === 'quotation' && list[i].open) {
        return list[i];
      }
    }
  }

  if(token === '[') {
    acc.push({
      type: 'quotation',
      body: [],
      open: true
    });
  } else if(token === ']') {
    var quotation = findClosestOpenQuotation(acc);
    delete quotation.open;
  } else {
    var quotation = findClosestOpenQuotation(acc);
    if(!quotation) {
      acc.push(token);
    } else {
      quotation.body.push(token);
    }
  }

  return acc;
}

//TODO: Fix nested tuples and quotations
function tuple(acc, token) {
  function findClosestOpenTuple(list) {
    for (var i = list.length - 1; i > -1; i--) {
      if(typeof list[i] === 'object' && list[i].type === 'tuple' && list[i].open) {
        return list[i];
      }
    }
  }

  var tuple = findClosestOpenTuple(acc);
  if(token === '(') {
    if(tuple) {
      tuple.body.push({
        type: 'tuple',
        body: [],
        open: true
      });
    }

  } else if(token === ')') {

    delete tuple.open;
  } else {
    var tuple = findClosestOpenTuple(acc);
    if(!tuple) {
      acc.push(token);
    } else {
      tuple.body.push(token);
    }
  }

  return acc;
}

//This works because you can't nest strings
function string(acc, token) {
  var previous = acc[acc.length - 1];
  if(typeof token === 'object') {
    acc.push(token);
    return acc;
  } else if(token.indexOf('"') === 0) {
    acc.push({
      type: 'string',
      body: token.slice(1),
      open: true
    });
    return acc;
  } else if(token.indexOf('"') === token.length - 1) {
    delete previous.open;
    previous.body += ' ' + token.slice(0, -1)
    return acc;
  } else if(previous && previous.open) {
    previous.body += ' ' + token;
    return acc;
  } else {
    acc.push(token);
    return acc;
  }
}

function word(token) {
  if(typeof token === 'object' && token.type !== 'string') {
    token.body = token.body.map(word);
    return token;
  } else if (typeof token === 'object' && token.type === 'string') {
    return token;
  }

  return {
    type: 'word',
    body: token
  };
}

/* NODE TYPES:
  - Load
  - Export
  - Comment
  - Define
  - Quotation
  - Tuple
  - Words

  - Word
*/
var tokenTypes = {
  'load': loadDirective,
  'export': exportDirective,
  'comment': comment,
  'define': define,
  'quotation': quotation,
  'tuple': tuple,
  'words': words
}
module.exports.parse = function parse(typedToken) {
  return tokenTypes[typedToken.type](typedToken.body);
}
