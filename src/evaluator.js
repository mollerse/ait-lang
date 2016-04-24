var path = require('path');
var compiler = require('./compiler');

function evaluateLoad(node, ast, context) {
  var pathToLoad = node.body;
  var filePath = path.parse(ast.metadata.source);
  var fileToLoad = path.join(filePath.dir, pathToLoad);
  var moduleAst = compiler.compile(`${fileToLoad}.ait`);

  return evaluate(moduleAst, context);
}

//TODO: Implement
function evaluateExport(node, ast, context) {
  return context;
}

//noop
function evaluateComment(node, ast, context) {
  return context;
}

function evaluateDefine(node, ast, context) {
  var define = node.body
  context.lexicon[define.keyword] = define.definition;

  return context;
}

function evaluateWord(node, ast, context) {
  var stack = context.stack;
  var lexicon = context.lexicon;
  if(node.type === 'word') {
    if(!isNaN(Number(node.body))) {

      stack.push(parseInt(node.body, 10));

    } else if(lexicon[node.body]) {

      var fnOrQuote = lexicon[node.body];
      if(typeof fnOrQuote === 'function') {
        fnOrQuote(context.stack, context.lexicon);
      } else if(typeof fnOrQuote === 'object' && fnOrQuote.type === 'quotation') {
        return evaluateQuotation(fnOrQuote, ast, context);
      }
    }
    return node.body;

  } else if(node.type === 'tuple') {

    stack.push(node.body.map(n => parseInt(n.body, 10)));

  } else if(node.type === 'quotation') {

    stack.push(node);

  } else if(node.type === 'string') {

    stack.push(node.body);

  }
  // console.log(stack);
}

function evaluateQuotation(node, ast, context) {
  node.body.forEach(word => evaluateWord(word, ast, context));
}

/* NODE TYPES:
  - Load
  - Export
  - Comment
  - Define
  - Quotation
  - List
  - Word
*/
var evaluate =  function evaluate(ast, context) {
  ast.forEach(function(node) {
    if(node.type === 'load') {
      context = evaluateLoad(node, ast, context);
    } else if(node.type === 'export') {
      context = evaluateExport(node, ast, context);
    } else if(node.type === 'define') {
      context = evaluateDefine(node, ast, context);
    } else if(node.type === 'quotation') {
      evaluateQuotation(node, ast, context);
    }

    //TODO: Handle export
  });

  return context;
}

module.exports.evaluate = evaluate;
