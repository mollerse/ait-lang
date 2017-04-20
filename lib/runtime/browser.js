// @flow

import BaseRuntime from './runtime';
import type { BrowserRuntime } from './types';

class BrowserRuntimeImpl extends BaseRuntime implements BrowserRuntime {
  type: 'browser';
  ctx: ?CanvasRenderingContext2D;
  animations: { [key: string]: number };

  constructor() {
    super();

    const canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d');
    this.animations = {};

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

  addAnimation(timestamp: number, id: number) {
    this.animations['' + timestamp] = id;
  }

  stopAnimations() {
    Object.keys(this.animations).forEach(k => {
      cancelAnimationFrame(this.animations[k]);
      delete this.animations[k];
    });
  }

  reset() {
    super.reset();
    this.stopAnimations();

    if (this.ctx) {
      this.ctx.restore();
      if (this.ctx) {
        this.ctx.save();
      }
    }
  }
}

export default function browser(): BrowserRuntimeImpl {
  return new BrowserRuntimeImpl();
}
