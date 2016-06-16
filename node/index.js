const Node = require('../src/runtime/runtimes/node');

const runtime = Node();

runtime.loadWords(require('../src/opt/canvas'));

runtime.setCanvasDimensions(500, 500);

runtime.evaluate(`${__dirname}/source.ait`);
runtime.writeImage(`${__dirname}/test.png`);
