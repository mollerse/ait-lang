function testLoadDirective(token) {
  return token[0] === '#load';
}

function testExportDirective(token) {
  return token[0] === '#export';
}

function testComment(token) {
  return token[0].indexOf('//') === 0;
}

function testDefine(token) {
  return token[0] && token[0].indexOf(':') === token[0].length - 1;
}

// Token -> TypedToken
module.exports.lex = function lex(token) {
  var type;
  if(testLoadDirective(token)) {
    type = 'load';
  } else if(testExportDirective(token)) {
    type = 'export';
  } else if(testDefine(token)) {
    type = 'define';
  } else if(testComment(token)) {
    type = 'comment';
  } else {
    type = 'words'
  }

  return {
    type: type,
    body: token
  };
}
