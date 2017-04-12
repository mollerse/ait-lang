// @flow
import type { NodeRuntime } from './types';

import BaseRuntime from './runtime';
import { createWriteStream } from 'fs';

let Canvas = null;
try {
  Canvas = require('canvas'); // eslint-disable-line
} catch (e) {
  throw new Error('This requres Canvas to run');
}

class NodeRuntimeImpl extends BaseRuntime implements NodeRuntime {
  type: 'node';
  root: string;
  ctx: ?CanvasRenderingContext2D;

  constructor(root: string) {
    super();

    this.root = root;

    // @FlowIgnore: Loading is wrapped in trycatch
    const canvas: HTMLCanvasElement = new Canvas();
    this.ctx = canvas.getContext('2d');

    if (this.ctx) {
      this.ctx.save();
    }
  }

  setCanvasDimensions(w: number, h: number) {
    if (!this.ctx) {
      return;
    }

    this.ctx.canvas.height = h;
    this.ctx.canvas.width = w;
  }

  reset() {
    super.reset();

    if (this.ctx) {
      this.ctx.restore();
      if (this.ctx) {
        this.ctx.save();
      }
    }
  }

  writeImage(file: string) {
    const out = createWriteStream(file);
    // @FlowIgnore: Not actually a HTMLCanvasElement
    const stream = this.ctx.canvas.pngStream();

    stream.on('data', function(chunk) {
      out.write(chunk);
    });

    stream.on('end', function() {
      console.log('saved png');
    });
  }
}

export default function node(cwd: string): NodeRuntimeImpl {
  return new NodeRuntimeImpl(cwd);
}
