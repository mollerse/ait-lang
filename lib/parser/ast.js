// @flow

export type Value = Primitive | Quotation | Record;
export type Word = Value | WordLiteral;
export type ASTNode = Word | Definition | LoadDirective;

export type Primitive = {
  type: 'primitive',
  body: string | boolean | number
}

export type WordLiteral = {
  type: 'word',
  body: string
}

export type Quotation = {
  type: 'quotation',
  body: Array<Word>
}

export type Record = {
  type: 'record',
  body: Array<[Primitive, Value]>
};

export type Definition = {
  type: 'definition',
  body: {
    keyword: string,
    body: Array<Word>
  }
}

export type LoadDirective = {
  type: 'load',
  body: string
};

export function primitiveString(body: string): Primitive {
  return {
    type: 'primitive',
    body
  };
}

export function primitiveBoolean(body: 'true' | 'false'): Primitive {
  return {
    type: 'primitive',
    body: body === 'true'
  };
}

export function primitiveNumber(body: string): Primitive {
  return {
    type: 'primitive',
    body: Number(body)
  };
}

export function wordLiteral(body: string): WordLiteral {
  return {
    type: 'word',
    body
  };
}

export function quotation(body: Array<Word>): Quotation {
  return {
    type: 'quotation',
    body
  };
}

export function record(body: Array<[Primitive, Value]>): Record {
  return {
    type: 'record',
    body
  };
}

export function definition([keyword, body]: [string, Array<Word>]): Definition {
  return {
    type: 'definition',
    body: { keyword, body }
  };
}

export function loadDirective(body: string): LoadDirective {
  return {
    type: 'load',
    body
  };
}
