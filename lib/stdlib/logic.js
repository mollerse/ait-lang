import { jsWord } from '../runtime/lexicon';
import { value } from './utils/program';

function small(top) {
  if (top.type == 'quotation') {
    return value(top.body.length < 2);
  }
  return value(top.body === 0 || top.body === 1 || top.body === -1);
}

function zero(top) {
  if (top.type == 'quotation') {
    return value(top.body.length === 0);
  }
  return value(top.body === 0);
}

export default {
  '>': jsWord(2, '>', (b, a) => value(a.body > b.body)),
  '<': jsWord(2, '<', (b, a) => value(a.body < b.body)),
  '=': jsWord(2, '=', (b, a) => {
    return value(a.body === b.body);
  }),
  '!=': jsWord(2, '!=', (b, a) => value(a.body !== b.body)),
  '>=': jsWord(2, '>=', (b, a) => value(a.body >= b.body)),
  '<=': jsWord(2, '<=', (b, a) => value(a.body <= b.body)),
  '||': jsWord(2, '||', (b, a) => value(a.body || b.body)),
  '&&': jsWord(2, '&&', (b, a) => value(a.body && b.body)),
  small: jsWord(1, 'small', small),
  zero: jsWord(1, 'zero', zero)
};
