// @flow

import {
  lazy,
  string,
  regex,
  alt,
  seq,
  eof,
  formatError
} from 'parsimmon';
import {
  wordLiteral,
  primitiveString,
  primitiveBoolean,
  primitiveNumber,
  quotation,
  record,
  definition,
  loadDirective
} from './ast';
import type { ASTNode } from './ast';

const newline = regex(/\n/);
const notNewlines = regex(/[^\n]*/);
const comment = string('#').then(notNewlines).skip(newline.or(eof));
const whitespace = regex(/\s+/);
const ignore = alt(whitespace, comment).many();
const lexme = p => p.skip(ignore);

const lbrace = lexme(string('{'));
const rbrace = lexme(string('}'));
const lbracket = lexme(string('['));
const rbracket = lexme(string(']'));
const blockterminator = lexme(string(';'));
const path = lexme(regex(/[a-zA-Z0-9._~!$&'()*+,;=:@%/-]+/)).desc('file-path');
const str = lexme(regex(/["|']((?:\\.|.)*?)["|']/, 1)).desc('quoted string');
const booleanTrue = lexme(string('true')).desc('boolean true literal');
const booleanFalse = lexme(string('false')).desc('boolean false literal');
const number = lexme(regex(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/)).desc('number literal');
const word = lexme(regex(/[a-zA-Z0-9.<>+=\\*%/_-]+/)).desc('word literal');
const load = lexme(string('@load'));
const colon = lexme(string(':')).desc('colon-char');

const primitive = lazy('primivite values', function() {
  return alt(
    primitiveStringParser,
    primitiveBooleanParser,
    primitiveNumberParser
  );
});

const value = lazy('top level-values', function() {
  return alt(
    primitive,
    recordParser,
    quotationParser
  );
});

const words = lazy('words', function() {
  return alt(
    value,
    wordLiteralParser
  );
});

const expressions = lazy('top-level expressions', function() {
  return alt(
    definitionParser,
    words,
    loadDirectiveParser
  );
});

const primitiveStringParser = str.map(primitiveString);
const primitiveBooleanParser = alt(booleanTrue, booleanFalse).map(primitiveBoolean);
const primitiveNumberParser = number.map(primitiveNumber);
const quotationParser = lbracket.then(words.many()).skip(rbracket).map(quotation);
const recordParser = lbrace.then(seq(primitive, value).many()).skip(rbrace).map(record);
const wordLiteralParser = word.map(wordLiteral);
const definitionParser = seq(word.skip(colon), words.many(), blockterminator).map(definition);
const loadDirectiveParser = load.then(path).skip(blockterminator).map(loadDirective);

const final = ignore.then(expressions.many());

export default function parse(src: string): Array<ASTNode> {
  const result = final.parse(src);
  if (result.status) {
    return result.value;
  }
  console.error(formatError(src, result));
  return [];
}
