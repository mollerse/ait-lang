const {JSWord} = require('../runtime/interfaces');

const raf = JSWord(function(quote) {
  const runtime = arguments[arguments.length - 1];

  const timestamp = (new Date()).valueOf();

  let lastFrame = 0;
  let rafID = requestAnimationFrame(function inner(t) {
    const delta = t - lastFrame;

    rafID = requestAnimationFrame(inner);
    runtime.addAnimation(timestamp, rafID);

    if(lastFrame && delta < 33) { return; }

    quote.evaluate();
    lastFrame = t;
  });
  runtime.addAnimation(timestamp, rafID);
});
raf.produces(0);

module.exports = { raf };
