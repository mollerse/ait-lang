import { jsWord } from '../runtime/lexicon';
import { execWithArity, quotation, word, exec } from './utils/program';

function linrec(collect, generate, done, test) {
  const rec = [];
  rec.push.apply(rec, exec(collect));
  rec.push(word('linrec'), collect, generate, done, test);
  rec.push.apply(rec, exec(generate));

  const ret = [word('branch')];
  ret.push(quotation(rec));
  ret.push(done);
  ret.push.apply(ret, execWithArity(0, test));

  return ret;
}

function tailrec(step, done, test) {
  const rec = [];
  rec.push(word('tailrec'), step, done, test);
  rec.push.apply(rec, exec(step));

  const ret = [word('branch')];
  ret.push(quotation(rec));
  ret.push(done);
  ret.push.apply(ret, execWithArity(0, test));

  return ret;
}

function binrec(collect, generate, done, test) {
  const rec = [];
  rec.push.apply(rec, exec(collect));
  rec.push(
    word('dip'),
    quotation([word('binrec'), collect, generate, done, test]),
    word('binrec'),
    collect,
    generate,
    done,
    test
  );
  rec.push.apply(rec, exec(generate));

  const ret = [word('branch')];
  ret.push(quotation(rec));
  ret.push(done);
  ret.push.apply(ret, execWithArity(0, test));

  return ret;
}

export default {
  linrec: jsWord(4, 'linrec', linrec),
  tailrec: jsWord(3, 'tailrec', tailrec),
  binrec: jsWord(4, 'binrec', binrec)
};
