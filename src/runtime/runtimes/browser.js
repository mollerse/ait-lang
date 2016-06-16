const BaseRuntime = require('./base');

class Browser extends BaseRuntime {
  constructor() {
    super();

    this.animations = {};
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    //Save the initial state of the canvas context;
    this.ctx.save();
  }

  setCanvasDimensions(w, h) {
    this.canvas.height = h;
    this.canvas.width = w;
  }

  addAnimation(timestamp, id) {
    this.animations[timestamp] = id;
  }

  stopAnimations() {
    Object.keys(this.animations).forEach(function(k) {
      cancelAnimationFrame(this.animations[k]);
      delete this.animations[k];
    }.bind(this));
  }

  reset() {
    super.reset();
    this.stopAnimations();

    //Restore the initial context
    this.ctx.restore();
    this.ctx.save();
  }
}

module.exports = () => new Browser(...arguments);
