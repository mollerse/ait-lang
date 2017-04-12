import jsword from '../runtime/jsword';

module.exports = {
  exec: jsword('exec', function(quotation) {
    this.evaluateQuotation(quotation);
  }),
  nullary: jsword('nullary', function(quotation) {
    this.evaluateQuotation(quotation, 0);
  }),
  unary: jsword('unary', function(quotation) {
    this.evaluateQuotation(quotation, 1);
  }),
  binary: jsword('binary', function(quotation) {
    this.evaluateQuotation(quotation, 2);
  }),
  ternary: jsword('ternary', function(quotation) {
    this.evaluateQuotation(quotation, 3);
  })
};
