var path = require('path');
var compile = require('./compile');

function evaluateLoad(node, context) {
  var pathToLoad = node.body;
  var filePath = path.parse(context.src);
  var fileToLoad = path.join(filePath.dir, pathToLoad);
  var moduleAst = compile(`${fileToLoad}.ait`);

  evaluate(moduleAst, context);
}

function evaluateComment(node, context) {
  //No-op
}

function evaluateDefine(node, context) {
  var define = node.body
  //We defer evaluation until use
  context.lexicon[define.keyword] = define.definition;
}

function evaluateWord(word, context) {
  if(word.type === 'quotation') {
    //Defer evaluation of quotations
    context.stack.push(word);
  } else if(word.type === 'tuple') {
    //Evaluate tuples immediatly
    var tuple = evaluate([word.body], {lexicon: context.lexicon, stack: []}).stack;
    context.stack.push(tuple)
  } else if(word.type === 'string') {
    context.stack.push(word.body);
  } else if(word.type === 'number') {
    context.stack.push(word.body);
  } else if(word.type === 'word') {
    var fn = context.lexicon[word.body];
    if(typeof fn === 'function') {
      fn(context);
    } else {
      evaluate([fn], context);
    }
  }
}

function evaluateWords(node, context) {
  node.body.forEach(w => evaluateWord(w, context));
}

var evaluate =  function evaluate(ast, context) {
  ast.forEach(function(node) {
    if(node.type === 'load') {
      evaluateLoad(node, context);
    } else if(node.type === 'comment') {
      evaluateComment(node, context);
    } else if(node.type === 'define') {
      evaluateDefine(node, context);
    } else if(node.type === 'words') {
      evaluateWords(node, context);
    }
  });

  return context;
}

module.exports = evaluate;
