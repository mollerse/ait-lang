// @flow

import { runtime } from './runtime';
import type { BrowserRuntime } from './runtime';
import stdlib from '../stdlib';

const browserRuntime = Object.assign({}, runtime, {
  init() {
    this.stack = [];
    this.lexicon = stdlib;
    this.type = 'browser';

    this.animations = {};
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    // Save the initial state of the canvas context;
    if (this.ctx) {
      this.ctx.save();
    }

    return this;
  },


  setCanvasDimensions(w, h) {
    this.canvas.height = h;
    this.canvas.width = w;
  },

  addAnimation(timestamp, id) {
    this.animations[timestamp] = id;
  },

  stopAnimations() {
    Object.keys(this.animations).forEach(function(k) {
      cancelAnimationFrame(this.animations[k]);
      delete this.animations[k];
    }.bind(this));
  },

  reset() {
    this.baseReset();
    this.lexicon = stdlib;
    this.stopAnimations();

    // Restore the initial context
    this.ctx.restore();
    this.ctx.save();
  }
});

export default function browser(): BrowserRuntime {
  const newRuntime = Object.create(browserRuntime);
  return newRuntime.init();
}
