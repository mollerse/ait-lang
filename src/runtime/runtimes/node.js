let Canvas = null;
try {
  Canvas = require('canvas');
} catch (er) {
  throw new Error("This requres Canvas to run")
}

const {readFileSync, createWriteStream} = require('fs');

const parse = require('../../parser/parse');
const BaseRuntime = require('./base');

class Node extends BaseRuntime {
  constructor() {
    super();

    this.canvas = new Canvas();
    this.ctx = this.canvas.getContext('2d');

    //Save the initial state of the canvas context;
    this.ctx.save();
  }

  setCanvasDimensions(w, h) {
    this.canvas.height = h;
    this.canvas.width = w;
  }

  // addAnimation(timestamp, id) {
  //   this.animations[timestamp] = id;
  // }
  //
  // stopAnimations() {
  //   Object.keys(this.animations).forEach(function(k) {
  //     cancelAnimationFrame(this.animations[k]);
  //     delete this.animations[k];
  //   }.bind(this));
  // }

  reset() {
    super.reset();

    //Restore the initial context
    this.ctx.restore();
    this.ctx.save();
  }

  evaluate(file) {
    this.src = file;
    const source = readFileSync(file, 'utf8').toString();

    super.evaluate(source);
  }

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
}

module.exports = () => new Node(...arguments);
