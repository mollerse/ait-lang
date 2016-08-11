const { readFileSync } = require('fs');
const {
  lazy,
  string,
  regex,
  alt,
  seq,
  eof
} = require('parsimmon');

const newline = regex(/\n/);
const notNewlines = regex(/[^\n]*/);
const comment = string('#').then(notNewlines).skip(newline.or(eof));
const whitespace = regex(/\s+/);
const ignore = alt(whitespace, comment).many();
const lexme = p => p.skip(ignore);

const lparen = lexme(string('('));
const rparen = lexme(string(')'));
const lbracket = lexme(string('['));
const rbracket = lexme(string(']'));
const blockterminator = lexme(string(';'));
const path = lexme(regex(/[a-zA-Z0-9._~!$&'()*+,;=:@%/-]+/)).desc('a file-path');
const str = lexme(regex(/"((?:\\.|.)*?)"/, 1)).desc('a quoted string');
const word = lexme(regex(/[a-zA-Z0-9.<>+=\\*%/_-]+/)).desc('an Ait word');
const load = lexme(string('@load'));
const colon = lexme(string(':'));

const expressions = lazy('top-level expressions', function() {
  return alt(
    stringLiteral,
    definition,
    wordLiteral,
    quotation,
    tuple,
    loadDirective
  );
});

const stringLiteral = str.map(s => ({type: 'string', body: s}));
const wordLiteral = word.map(w => ({type: 'word', body: w}));
const quotation = lbracket.then(expressions.many()).skip(rbracket).map(q => ({type: 'quotation', body: q}));
const tuple = lparen.then(expressions.many()).skip(rparen).map(t => ({type: 'tuple', body: t}));
const definition = seq(word.skip(colon), expressions.many(), blockterminator)
  .map(d => ({type: 'definition', body: {keyword: d[0], body: d[1]}}));
const loadDirective = load.then(path).skip(blockterminator).map(d => ({type: 'load', body: d}));

const final = ignore.then(expressions.many());

module.exports = function parse(src) {
  return final.parse(src).value;
};
