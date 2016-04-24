var evaluator = require('../../src/evaluator');

var globalCanvas = global.canvas = {
  fillRect: () => {},
  translate: () => {},
  lineWidth: () => {},
  globalAlpha: () => {},
  strokeStyle: () => {},
  fillStyle: () => {},
}

module.exports = {
  '<height': function(stack) {
    stack.push(100);
  },
  '<width': function(stack) {
    stack.push(100);
  },
  '<context': function(stack, lexicon) {
    var quotation = stack.pop();
    evaluator.evaluate([quotation], {stack: stack, lexicon: lexicon});
    var setter = stack.pop();
    setter(globalCanvas);
  },
  fillRect: function(stack) {
    var height = stack.pop();
    var width = stack.pop();
    var y = stack.pop();
    var x = stack.pop();

    stack.push(function(canvas) {
      canvas.fillRect(x, y, width, height);
    });
  },
  translate: function(stack) {
    var y = stack.pop();
    var x = stack.pop();

    stack.push(function(canvas) {
      canvas.translate(x, y);
    });
  },
  lineWidth: function(stack) {
    var width = stack.pop();

    stack.push(function(canvas) {
      canvas.lineWidth(width);
    });
  },
  globalAlpha: function(stack) {
    var alpha = stack.pop();

    stack.push(function(canvas) {
      canvas.globalAlpha(alpha);
    });
  },
  strokeStyle: function(stack) {
    var style = stack.pop();

    stack.push(function(canvas) {
      canvas.strokeStyle(style);
    });
  },
  fillStyle: function(stack) {
    var style = stack.pop();

    stack.push(function(canvas) {
      canvas.fillStyle(style);
    });
  },
  quadraticCurveTo: function(stack) {
    var controlPoint = stack.pop();
    var newPoint = stack.pop();

    stack.push(`q ${newPoint[0]} ${newPoint[1]} ${controlPoint[0]} ${controlPoint[1]}`);
  },
  moveTo: function(stack) {
    var newPoint = stack.pop();

    stack.push(`m ${newPoint[0]} ${newPoint[1]}`);
  },
  closePath: function(stack) {
    stack.push(`z`);
  },
};
