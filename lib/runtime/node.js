// @flow

import { runtime } from './runtime';
import type { NodeRuntime } from './runtime';
import stdlib from '../stdlib';
import { createWriteStream } from 'fs';

let Canvas = null;
try {
  Canvas = require('canvas'); // eslint-disable-line
} catch (er) {
  throw new Error('This requres Canvas to run');
}


const nodeRuntime = Object.assign({}, runtime, {
  init(cwd: string) {
    this.stack = [];
    this.lexicon = stdlib;
    this.root = cwd;
    this.type = 'node';

    if (Canvas) {
      this.canvas = new Canvas();
      this.ctx = this.canvas.getContext('2d');

      // Save the initial state of the canvas context;
      this.ctx.save();
    }

    return this;
  },

  setCanvasDimensions(w, h) {
    this.canvas.height = h;
    this.canvas.width = w;
  },

  reset() {
    this.baseReset();
    this.lexicon = stdlib;

    // Restore the initial context
    this.ctx.restore();
    this.ctx.save();
  },

  writeImage(file) {
    const out = createWriteStream(file)
    const stream = this.canvas.pngStream();

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    stream.on('end', function(){
      console.log('saved png');
    });
  }
});

export default function node(cwd: string): NodeRuntime {
  const newRuntime = Object.create(nodeRuntime);
  return newRuntime.init(cwd);
}
