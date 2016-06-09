const evaluate = require('../../src/evaluate');

module.exports = {
  '<height': function({stack, canvas}) {
    stack.push(canvas.height);
  },
  '<width': function({stack, canvas}) {
    stack.push(canvas.width);
  },
  fillRect: function({stack, ctx}) {
    const height = stack.pop();
    const width = stack.pop();
    const y = stack.pop();
    const x = stack.pop();

    ctx.fillRect(x, y, width, height);
  },
  translate: function({stack, ctx}) {
    const y = stack.pop();
    const x = stack.pop();

    ctx.translate(x, y);
  },
  lineWidth: function({stack, ctx}) {
    const width = stack.pop();

    ctx.lineWidth = width;
  },
  globalAlpha: function({stack, ctx}) {
    const alpha = stack.pop();

    ctx.globalAlpha = alpha;
  },
  strokeStyle: function({stack, ctx}) {
    const style = stack.pop();

    ctx.strokeStyle = style;
  },
  fillStyle: function({stack, ctx}) {
    const style = stack.pop();

    ctx.fillStyle = style;
  },
  quadraticCurveTo: function({stack}) {
    const controlPoint = stack.pop();
    const newPoint = stack.pop();

    stack.push(`Q ${newPoint[0]} ${newPoint[1]} ${controlPoint[0]} ${controlPoint[1]}`);
  },
  moveTo: function({stack}) {
    const newPoint = stack.pop();

    stack.push(`M ${newPoint[0]} ${newPoint[1]}`);
  },
  closePath: function({stack}) {
    stack.push(`Z`);
  },
  stroke: function({stack, ctx}) {
    const pathData = stack.join();
    const p = new Path2D(pathData);
    ctx.stroke(p);
  }
};
