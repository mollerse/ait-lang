const evaluate = require('../../src/evaluate');

module.exports = {
  'raf': function(context) {
    const {stack, metadata} = context;
    const quotation = stack.pop();
    let lastFrame = 0;
    const ID = (new Date()).valueOf();
    metadata.rafs[ID] = requestAnimationFrame(function inner(t) {
      const delta = t - lastFrame;
      metadata.rafs[ID] = requestAnimationFrame(inner);

      if(lastFrame && delta < 33) {
        return;
      }
      evaluate(quotation.body, context);
      lastFrame = t;
    });
  }
};
