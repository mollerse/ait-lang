var evaluate = require('../../src/evaluate');

var globalCanvas = global.canvas = {
  fillRect: () => {},
  translate: () => {},
  lineWidth: () => {},
  globalAlpha: () => {},
  strokeStyle: () => {},
  fillStyle: () => {},
}

module.exports = {
  '<height': function(context) {
    var stack = context.stack;
    stack.push(100);
  },
  '<width': function(context) {
    var stack = context.stack;
    stack.push(100);
  },
  '<context': function(context) {
    var stack = context.stack;
    var quotation = stack.pop();
    evaluate([quotation.body], context);
    var setter = stack.pop();
    setter(globalCanvas);
  },
  fillRect: function(context) {
    var stack = context.stack;
    var height = stack.pop();
    var width = stack.pop();
    var y = stack.pop();
    var x = stack.pop();

    stack.push(function(canvas) {
      canvas.fillRect(x, y, width, height);
    });
  },
  translate: function(context) {
    var stack = context.stack;
    var y = stack.pop();
    var x = stack.pop();

    stack.push(function(canvas) {
      canvas.translate(x, y);
    });
  },
  lineWidth: function(context) {
    var stack = context.stack;
    var width = stack.pop();

    stack.push(function(canvas) {
      canvas.lineWidth(width);
    });
  },
  globalAlpha: function(context) {
    var stack = context.stack;
    var alpha = stack.pop();

    stack.push(function(canvas) {
      canvas.globalAlpha(alpha);
    });
  },
  strokeStyle: function(context) {
    var stack = context.stack;
    var style = stack.pop();

    stack.push(function(canvas) {
      canvas.strokeStyle(style);
    });
  },
  fillStyle: function(context) {
    var stack = context.stack;
    var style = stack.pop();

    stack.push(function(canvas) {
      canvas.fillStyle(style);
    });
  },
  quadraticCurveTo: function(context) {
    var stack = context.stack;
    var controlPoint = stack.pop();
    var newPoint = stack.pop();

    stack.push(`q ${newPoint[0]} ${newPoint[1]} ${controlPoint[0]} ${controlPoint[1]}`);
  },
  moveTo: function(context) {
    var stack = context.stack;
    var newPoint = stack.pop();

    stack.push(`m ${newPoint[0]} ${newPoint[1]}`);
  },
  closePath: function(context) {
    var stack = context.stack;
    stack.push(`z`);
  },
};
