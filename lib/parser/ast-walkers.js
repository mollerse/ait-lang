// @flow
import type {
  ASTNode,
  LoadDirective,
  Definition,
  Var,
  GlobalVar,
  Word,
  Value,
  Quotation,
  AitNumber,
  AitString
} from './ast';

import { aitValue, quotation } from './ast';

function isType(type: string, node: ASTNode): boolean {
  return node.type === type;
}

function findAstNode(pred: ASTNode => boolean, ast: Array<ASTNode>) {
  function extractVars(nodes) {
    let ret = [];
    for (var i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (pred(node)) {
        ret.push(node);
      } else if (node.type === 'quotation') {
        ret = ret.concat(extractVars(node.body));
      } else if (node.type === 'defintion') {
        ret = ret.concat(extractVars(node.body.body));
      }
    }
    return ret;
  }

  return extractVars(ast);
}

export function unwrapValueInternal(node: ASTNode): mixed {
  if (
    isLoadDirective(node) ||
    isWord(node) ||
    isString(node) ||
    isNumber(node) ||
    isBool(node) ||
    isAitValue(node) ||
    isVar(node) ||
    isGlobalVar(node)
  ) {
    return node.body;
  } else if (isDefinition(node)) {
    return ((node: any): Definition).body.body.map(unwrapValueInternal).reverse();
  } else if (isQuotation(node)) {
    return ((node: any): Quotation).body.map(unwrapValueInternal).reverse();
  }
}

export function unwrapValueFFI(node: ASTNode) {
  if (isWord(node) || isString(node) || isNumber(node) || isBool(node) || isAitValue(node)) {
    return node.body;
  } else if (isQuotation(node)) {
    return node;
  } else if (isVar(node) || isGlobalVar(node)) {
    throw new Error(`FFI Error: Operating on variable declarations are not supported`);
  } else if (isDefinition(node)) {
    throw new Error(`FFI Error: Operating on definitions are not supported`);
  } else if (isLoadDirective(node)) {
    throw new Error(`FFI Error: Operating on load directives are not supported`);
  } else {
    throw new Error(`Internal Error: Missing unwrapper for ASTNode type "${node.type}"`);
  }
}

export function wrapValueFFI(value: mixed) {
  return aitValue(value);
}

export function wrapQuotationFFI(value: Array<Value>) {
  return quotation(value);
}

export function prettyPrint(node: ASTNode): string {
  if (isWord(node) || isString(node) || isNumber(node)) {
    const n = ((node: any): Word | AitString | AitNumber);
    return `${n.body}`;
  } else if (isBool(node)) {
    return node.body ? 'true' : 'false';
  } else if (isDefinition(node)) {
    const def = ((node: any): Definition);
    const defBody = def.body.body.reverse().map(prettyPrint);
    return `${def.body.keyword}:\n  ${defBody.join(defBody.length > 3 ? '\n  ' : ' ')} ;`;
  } else if (isQuotation(node)) {
    const quote = ((node: any): Quotation);
    const quoteBody = quote.body.map(prettyPrint).reverse();
    return `[ ${quoteBody.join(quoteBody.length > 3 ? '\n  ' : ' ')} ]`;
  } else if (isVar(node)) {
    const v = ((node: any): Var);
    return `-> ${v.body}`;
  } else if (isGlobalVar(node)) {
    const v = ((node: any): GlobalVar);
    return `->> ${v.body}`;
  } else if (isAitValue(node)) {
    // @FlowIgnore everything has toString and this is unsafe by design
    return node.body.toString();
  } else {
    return '';
  }
}

export const isLoadDirective: (node: ASTNode) => boolean = isType.bind(null, 'load');
export const isDefinition: (node: ASTNode) => boolean = isType.bind(null, 'definition');
export const isBool: (node: ASTNode) => boolean = isType.bind(null, 'bool');
export const isNumber: (node: ASTNode) => boolean = isType.bind(null, 'number');
export const isString: (node: ASTNode) => boolean = isType.bind(null, 'string');
export const isWord: (node: ASTNode) => boolean = isType.bind(null, 'word');
export const isVar: (node: ASTNode) => boolean = isType.bind(null, 'var');
export const isGlobalVar: (node: ASTNode) => boolean = isType.bind(null, 'globalVar');
export const isAitValue: (node: ASTNode) => boolean = isType.bind(null, 'value');
export const isQuotation: (node: ASTNode) => boolean = isType.bind(null, 'quotation');
export const isValue: (node: ASTNode) => boolean = node =>
  isBool(node) ||
  isNumber(node) ||
  isString(node) ||
  isWord(node) ||
  isVar(node) ||
  isGlobalVar(node) ||
  isAitValue(node) ||
  isQuotation(node);

//Exports downcasted through any-casting to circumvent Flow limitations
export const findLoadDirectives = ((findAstNode.bind(null, isLoadDirective): any): (
  ast: Array<ASTNode>
) => Array<LoadDirective>);
export const findDefinitions = ((findAstNode.bind(null, isDefinition): any): (
  ast: Array<ASTNode>
) => Array<Definition>);
export const findVariables = ((findAstNode.bind(null, isVar): any): (
  ast: Array<ASTNode>
) => Array<Var>);
export const findGlobalVariables = ((findAstNode.bind(null, isGlobalVar): any): (
  ast: Array<ASTNode>
) => Array<GlobalVar>);
export const findWords = ((findAstNode.bind(null, isWord): any): (
  ast: Array<ASTNode>
) => Array<Word>);
export const findValues = ((findAstNode.bind(null, isValue): any): (
  ast: Array<ASTNode>
) => Array<Value>);
