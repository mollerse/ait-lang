//Body is either a JS-function or an Ait-quotation

//The JS-function takes N params, provided off the stack and produces M results
//to be pushed onto the stack.

//The Ait quotation is defined purely in the langauge and has full access to all
//language features.

class Word {
  constructor(word) {
    this.word = word;
  }
}

//For internal use only
class AitWord extends Word {
  constructor(quote, context, evalfn) {
    super(quote);

    this.context = context;
    this.evalfn = evalfn;
  }

  consumes(n) {
    this.consume = n;
  }

  evaluate() {
    this.evalfn(this.word, this.context);
  }
}

class JSWord extends Word {
  constructor(fn) {
    super(fn);

    this.consume = fn.length;
    this.produce = 1;
  }

  consumes(n) {
    this.consume = n;
  }

  produces(n) {
    this.produce = n;
  }

  evaluate(context) {
    const {stack} = context;
    let args = [];
    for(let i = 0; i < this.consume; i++) {
      args.unshift(stack.pop());
    }
    const needs = this.word.length;
    if(needs > this.consume) {
      const missing = needs - this.consume;
      args = stack.slice(-missing).concat(args);
    }

    //Pass the context as the last argument
    args = args.concat(context)

    const result = this.word.apply(null, args);

    if(this.produce === 1) {
      stack.push(result);
    } else if(this.produce > 1) {
      for (let i = 0; i < this.produce; i++) {
        stack.push(result.pop())
      }
    }
  }
}

//Factories for easy use
const nullary = function nullary(fn) {
  const inner = new JSWord(fn);
  inner.consumes(0);

  return inner;
}

const unary = function unary(fn) {
  const inner = new JSWord(fn);
  inner.consumes(1);

  return inner;
}

const binary = function binary(fn) {
  const inner = new JSWord(fn);
  inner.consumes(2);

  return inner;
}

const tertiary = function tertiary(fn) {
  const inner = new JSWord(fn);
  inner.consumes(3);

  return inner;
}

module.exports = {
  nullary,
  unary,
  binary,
  tertiary,
  JSWord: function() {return new JSWord(...arguments);},
  AitWord: function() {return new AitWord(...arguments);}
};
