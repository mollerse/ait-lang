var evaluate = require('../../src/evaluate');

module.exports = {
  'raf': function(context) {
    var stack = context.stack;
    var quotation = stack.pop();
    var lastFrame = 0;
    requestAnimationFrame(function inner(t) {
      var delta = t - lastFrame;
      requestAnimationFrame(inner);

      if(lastFrame && delta < 33) {
        return;
      }
      evaluate([quotation.body], context);
      lastFrame = t;
    });
  }
};
