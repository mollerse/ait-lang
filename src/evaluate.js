const {readFileSync} = require('fs');
const path = require('path');
const parse = require('./parse');

function evaluateLoad({body: pathToLoad}, context) {
  const filePath = path.parse(context.src);
  const fileToLoad = path.join(filePath.dir, pathToLoad);
  const moduleAst = parse(readFileSync(`${fileToLoad}.ait`, 'utf8').toString());

  evaluate(moduleAst, context);
}

function evaluateDefine({body: {keyword, body}}, {lexicon}) {
  lexicon[keyword] = body;
}

function evaluateWord({body: word}, context) {
  const {stack, lexicon} = context;

  if(!isNaN(Number(word))) {
    stack.push(Number(word));
    return;
  }

  var fn = lexicon[word];
  if(typeof fn === 'function') {
    fn(context);
  } else {
    evaluate(fn, context);
  }
}

function evaluateQuote(node, {stack}) {
  stack.push(node);
}

function evaluateTuple({body: tuple}, {lexicon, stack}) {
  const {stack: result} = evaluate(tuple, {lexicon, stack: []});
  stack.push(result);
}

function evaluateString({body: word}, {stack}) {
  stack.push(word);
}

var evaluate =  function evaluate(ast, context) {
  ast.forEach(function(node) {
    if(node.type === 'load') {
      evaluateLoad(node, context);
    } else if(node.type === 'definition') {
      evaluateDefine(node, context);
    } else if(node.type === 'word') {
      evaluateWord(node, context);
    } else if(node.type === 'quotation') {
      evaluateQuote(node, context);
    } else if(node.type === 'tuple') {
      evaluateTuple(node, context);
    } else if(node.type === 'string') {
      evaluateString(node, context);
    }
  });

  return context;
}

module.exports = evaluate;
