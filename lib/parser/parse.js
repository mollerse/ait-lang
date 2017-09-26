// @flow

import { lazy, string, regex, alt, seq, eof, formatError } from 'parsimmon';
import {
  word,
  primitiveString,
  primitiveBoolean,
  primitiveNumber,
  quotation,
  definition,
  loadDirective,
  aitVar,
  aitGlobalVar
} from './ast';
import aitFault from '../aitFault';

import type { ASTNode } from './ast';
import type { AitFault } from '../aitFault';

const newline = regex(/\n/);
const notNewlines = regex(/[^\n]*/);
const comment = string('#').then(notNewlines).skip(newline.or(eof));
const whitespace = regex(/\s+/);
const ignore = alt(whitespace, comment).many();
const lexme = p => p.skip(ignore);

const lbracket = lexme(string('['));
const rbracket = lexme(string(']'));
const blockterminator = lexme(string(';'));
const path = lexme(regex(/[a-zA-Z0-9._~!$&'()*+,;=:@%/-]+/)).desc('file-path');
const str = lexme(regex(/["']((?:\\.|.|\n)*?)["']/, 1)).desc('quoted string');
const booleanTrue = lexme(string('true')).desc('boolean true literal');
const booleanFalse = lexme(string('false')).desc('boolean false literal');
const number = lexme(regex(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|[-+]?Infinity/)).desc(
  'number literal'
);
const wordLiteral = lexme(regex(/[a-zA-Z0-9.<>+=\\*%!\|&/_-]+/)).desc('word literal');
const load = lexme(string('@load'));
const arrow = lexme(string('->'));
const fatArrow = lexme(string('->>'));
const colon = lexme(string(':')).desc('colon-char');

const primitive = lazy('primivite values', function() {
  return alt(primitiveStringParser, primitiveBooleanParser, primitiveNumberParser);
});

const value = lazy('top level-values', function() {
  return alt(primitive, quotationParser);
});

const words = lazy('words', function() {
  return alt(value, setGlobalVarParser, setVarParser, wordLiteralParser);
});

const expressions = lazy('top-level expressions', function() {
  return alt(definitionParser, words, loadDirectiveParser);
});

const primitiveStringParser = str.map(primitiveString);

const primitiveBooleanParser = alt(booleanTrue, booleanFalse).map(primitiveBoolean);

const primitiveNumberParser = number.map(primitiveNumber);

const quotationParser = lbracket.then(words.many()).skip(rbracket).map(quotation);
const wordLiteralParser = wordLiteral.map(word);

const definitionParser = seq(wordLiteral.skip(colon), words.many(), blockterminator).map(
  definition
);

const loadDirectiveParser = load.then(path).skip(blockterminator).map(loadDirective);

const setVarParser = arrow.then(wordLiteral).map(aitVar);
const setGlobalVarParser = fatArrow.then(wordLiteral).map(aitGlobalVar);

const final = ignore.then(expressions.many());

export default function parse(src: string): Array<ASTNode> | AitFault {
  const result = final.parse(src);
  if (result.status) {
    return (result.value: Array<ASTNode>).reverse();
  }
  return aitFault(formatError(src, result));
}
