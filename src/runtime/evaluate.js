const {readFileSync} = require('fs');
const path = require('path');

const parse = require('../parser/parse');
const {AitWord} = require('./interfaces');
const internalStack = require('./stack');

var evaluate = function evaluate(ast, context) {
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
};

module.exports = evaluate;

function evaluateLoad({body: pathToLoad}, context) {
  const filePath = path.parse(context.src);
  const fileToLoad = path.join(filePath.dir, pathToLoad);
  const moduleAst = parse(readFileSync(`${fileToLoad}.ait`, 'utf8').toString());

  evaluate(moduleAst, context);
}

function evaluateDefine({body: {keyword, body}}, context) {
  const {lexicon} = context;
  lexicon[keyword] = AitWord(body, context, evaluate);
}

function evaluateWord({body: word}, context) {
  const {stack, lexicon} = context;

  if(!isNaN(Number(word))) {
    stack.push(Number(word));
    return;
  }

  const fn = lexicon[word];
  if(!fn) {
    throw new Error(`${word} was not found in the lexicon!`);
  }
  fn.evaluate(context);
}

function evaluateQuote({body}, context) {
  const {stack} = context;
  stack.push(AitWord(body, context, evaluate));
}

function evaluateTuple({body: tuple}, {lexicon, stack}) {
  const {stack: result} = evaluate(tuple, {lexicon, stack: internalStack()});
  stack.push(result.stack());
}

function evaluateString({body: word}, {stack}) {
  stack.push(word);
}
