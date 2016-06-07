const {
  startsWith,
  endsWith
} = require('./stringhelpers');

const isLoad = startsWith.bind(null, '#load');
const isComment = startsWith.bind(null, '//');
const isDefine = endsWith.bind(null, ':');

module.exports = function lex(block) {
  let type;
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
