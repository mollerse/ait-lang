import jsword from '../runtime/jsword';

module.exports = {
  '>': jsword((b, a) => a > b, '>'),
  '<': jsword((b, a) => a < b, '<'),
  '==': jsword((b, a) => a === b, '=='),
  '>=': jsword((b, a) => a >= b, '>='),
  '<=': jsword((b, a) => a <= b, '<='),
  '||': jsword((b, a) => a || b, '||'),
  '&&': jsword((b, a) => a && b, '&&')
};
