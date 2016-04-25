var sh = require('./stringhelpers');
var isLoad = sh.startsWith.bind(null, '#load');
var isComment = sh.startsWith.bind(null, '//');
var isDefine = sh.endsWith.bind(null, ':');

module.exports = function lex(block) {
  var type;
  if(isLoad(block[0])) {
    type = 'load';
  } else if(isComment(block[0])) {
    type = 'comment';
  } else if(isDefine(block[0])) {
    type = 'define';
  } else {
    type = 'words';
  }

  return {
    type: type,
    body: block
  };
};
