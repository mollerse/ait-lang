const evaluate = require('../../src/evaluate');

module.exports = {
  'raf': function(context) {
    const {stack} = context;
    const quotation = stack.pop();
    let lastFrame = 0;
    requestAnimationFrame(function inner(t) {
      const delta = t - lastFrame;
      requestAnimationFrame(inner);

      if(lastFrame && delta < 33) {
        return;
      }
      evaluate(quotation.body, context);
      lastFrame = t;
    });
  }
};
