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

var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
canvas.setAttributeNS(null, 'viewBox', '-150 -150 300 300');
canvas.style.display = 'block';
canvas.style.height = '500px';
canvas.style.width = '500px';

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
    canvas: canvas
  };

  return evaluate(ast, context);
}

function runEval() {
  var lastFrame = 0;
  requestAnimationFrame(function inner(t) {
    var delta = t - lastFrame;
    requestAnimationFrame(inner);

    if(lastFrame && delta < 66) {
      return;
    }

    canvas.innerHTML = '';
    interpret(source.value);
    lastFrame = t;
  });
}

doEval.addEventListener('click', runEval);
