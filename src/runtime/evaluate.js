const {readFileSync} = require('fs');
const path = require('path');

const parse = require('../parser/parse');
const {AitWord} = require('./interfaces');
const internalStack = require('./stack');

var evaluate = function evaluate(ast, runtime) {
  ast.forEach(function(node) {
    if(node.type === 'load') {
      evaluateLoad(node, runtime);
    } else if(node.type === 'definition') {
      evaluateDefine(node, runtime);
    } else if(node.type === 'word') {
      evaluateWord(node, runtime);
    } else if(node.type === 'quotation') {
      evaluateQuote(node, runtime);
    } else if(node.type === 'tuple') {
      evaluateTuple(node, runtime);
    } else if(node.type === 'string') {
      evaluateString(node, runtime);
    }
  });

  return runtime;
};

module.exports = evaluate;

function evaluateLoad({body: pathToLoad}, runtime) {
  const filePath = path.parse(runtime.src);
  const fileToLoad = path.join(filePath.dir, pathToLoad);
  const moduleAst = parse(readFileSync(`${fileToLoad}.ait`, 'utf8').toString());

  evaluate(moduleAst, runtime);
}

function evaluateDefine({body: {keyword, body}}, runtime) {
  const {lexicon} = runtime;
  lexicon[keyword] = AitWord(body, runtime, evaluate);
}

function evaluateWord({body: word}, runtime) {
  const {stack, lexicon} = runtime;

  if(!isNaN(Number(word))) {
    stack.push(Number(word));
    return;
  }

  const fn = lexicon[word];
  if(!fn) {
    throw new Error(`${word} was not found in the lexicon!`);
  }
  fn.evaluate(runtime);
}

function evaluateQuote({body}, runtime) {
  const {stack} = runtime;
  stack.push(AitWord(body, runtime, evaluate));
}

function evaluateTuple({body: tuple}, {lexicon, stack}) {
  const {stack: result} = evaluate(tuple, {lexicon, stack: internalStack()});
  stack.push(result.stack());
}

function evaluateString({body: word}, {stack}) {
  stack.push(word);
}
