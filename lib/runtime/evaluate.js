const {readFileSync} = require('fs');
const path = require('path');
const clone = require('lodash.clonedeep');

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

function resolveModule(modulePath, runtime) {
  if(modulePath.indexOf('./') === 0) {
    const rootFile = path.parse(runtime.root);
    modulePath = path.join(rootFile.dir, modulePath);
  }
  try {
    //See if it resolves to a module
    return require.resolve(modulePath);
  } catch (e) {
    try {
      //Since it did not resolve to a module, see if it resolves to an ait-file
      return require.resolve(`${modulePath}.ait`);
    } catch (e) {
      throw new Error(`Could not load module ${modulePath}`);
    }
  }
}

function evaluateLoad({body: pathToLoad}, runtime) {
  const modulePath = resolveModule(pathToLoad, runtime);
  const ext = path.parse(modulePath).ext;

  if(ext === '.js') {
    const module = require(modulePath);
    runtime.loadWords(module);
  } else if(ext === '.ait') {
    const moduleAst = parse(readFileSync(modulePath, 'utf8').toString());
    //Need to clone the runtime, because we don't know which runtime is currently being used
    const runtimeClone = clone(runtime);
    //Re-assign the root to the module for module-relative loads
    runtimeClone.root = modulePath;
    //Reset the runtime avoid stack pollution
    runtimeClone.reset();
    //Evaluate module
    evaluate(moduleAst, runtimeClone);
    //Load the new words into this runtime
    runtime.loadWords(runtimeClone.lexicon);
  } else {
    throw new Error(`File type ${ext} is not supported. Try loading an .ait or .js file!`);
  }
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
