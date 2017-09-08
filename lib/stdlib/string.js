import { jsWord } from '../runtime/lexicon';
import { value } from './utils/program';

export default {
  replace: jsWord(2, 'replace', function(string, replacement) {
    return value(string.body.replace(/%s/, replacement.body));
  }),
  replace2: jsWord(3, 'replace2', function(string, r1, r2) {
    return value(string.body.replace(/%s/, r1.body).replace(/%s/, r2.body));
  }),
  replace3: jsWord(4, 'replace3', function(string, r1, r2, r3) {
    return value(string.body.replace(/%s/, r1.body).replace(/%s/, r2.body).replace(/%s/, r3.body));
  })
};
