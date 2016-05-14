var evaluate = require('../../src/evaluate');

module.exports = {
  '<height': function(context) {
    var stack = context.stack;
    var canvas = context.canvas;
    stack.push(canvas.height);
  },
  '<width': function(context) {
    var stack = context.stack;
    var canvas = context.canvas;
    stack.push(canvas.width);
  },
  '<context': function(context) {
    var stack = context.stack;
    var quotation = stack.pop();
    evaluate([quotation.body], context);
    var setter = stack.pop();
    setter(context.ctx);
  },
  fillRect: function(context) {
    var stack = context.stack;
    var height = stack.pop();
    var width = stack.pop();
    var y = stack.pop();
    var x = stack.pop();

    stack.push(function(ctx) {
      ctx.fillRect(x, y, width, height);
    });
  },
  translate: function(context) {
    var stack = context.stack;
    var y = stack.pop();
    var x = stack.pop();

    stack.push(function(ctx) {
      ctx.translate(x, y);
    });
  },
  lineWidth: function(context) {
    var stack = context.stack;
    var width = stack.pop();

    stack.push(function(ctx) {
      ctx.lineWidth = width;
    });
  },
  globalAlpha: function(context) {
    var stack = context.stack;
    var alpha = stack.pop();

    stack.push(function(ctx) {
      ctx.globalAlpha = alpha;
    });
  },
  strokeStyle: function(context) {
    var stack = context.stack;
    var style = stack.pop();

    stack.push(function(ctx) {
      ctx.strokeStyle = style;
    });
  },
  fillStyle: function(context) {
    var stack = context.stack;
    var style = stack.pop();

    stack.push(function(ctx) {
      ctx.fillStyle = style;
    });
  },
  quadraticCurveTo: function(context) {
    var stack = context.stack;
    var controlPoint = stack.pop();
    var newPoint = stack.pop();

    stack.push(`Q ${newPoint[0]} ${newPoint[1]} ${controlPoint[0]} ${controlPoint[1]}`);
  },
  moveTo: function(context) {
    var stack = context.stack;
    var newPoint = stack.pop();

    stack.push(`M ${newPoint[0]} ${newPoint[1]}`);
  },
  closePath: function(context) {
    var stack = context.stack;
    stack.push(`Z`);
  },
  stroke: function(context) {
    var ctx = context.ctx;
    var pathData = context.stack.join();
    context.stack = [];
    var p = new Path2D(pathData);
    ctx.stroke(p);
    prevPath = pathData;
  }
};
