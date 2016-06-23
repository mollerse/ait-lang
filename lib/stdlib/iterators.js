const copy = require('lodash.clonedeep');
const {JSWord} = require('../runtime/interfaces');

const whileLoop = JSWord(function(loopQuote, checkQuote) {
  const {stack} = arguments[arguments.length - 1];

  checkQuote.evaluate();
  let result = stack.pop();

  while(result) {
    loopQuote.evaluate();
    checkQuote.evaluate();
    result = stack.pop();
  }
});
whileLoop.produces(0);


module.exports = { 'while': whileLoop };
