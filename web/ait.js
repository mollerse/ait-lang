var fs = require('fs');

var compile = require('../src/compile');
var evaluate = require('../src/evaluate');

var source = document.createElement('textarea');
source.setAttribute('rows', 50);
source.setAttribute('cols', 80);
source.value = fs.readFileSync(__dirname + '/source.ait');
var doEval = document.createElement('button');
doEval.textContent = 'Evaluate';
var output = document.createElement('output');

var canvas = document.createElement('canvas');
canvas.height = '500';
canvas.width = '500';

var ctx = canvas.getContext('2d');

document.body.appendChild(source);
document.body.appendChild(doEval);
document.body.appendChild(output);
document.body.appendChild(canvas);

function interpret(source) {
  var ast = compile(source);

  var stdlib = require('../lang/stdlib');
  var context = {
    stack: [],
    lexicon: Object.assign({}, stdlib),
    src: 'local',
    ctx: ctx,
    canvas: canvas
  };

  return evaluate(ast, context);
}

doEval.addEventListener('click', () => interpret(source.value));
