// @flow

export type Primitive = {
  type: 'primitive',
  body: boolean | string | number
};

export type Word = {
  type: 'word',
  body: string
};

export type Quotation = {
  type: 'quotation',
  body: Array<Value>
};

export type Definition = {
  type: 'definition',
  body: {
    keyword: string,
    body: Array<Value>
  }
};

export type LoadDirective = {
  type: 'load',
  body: string
};

export type Value = Primitive | Word | Quotation;
export type ASTNode = Value | Definition | LoadDirective;

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

export function word(body: string): Word {
  return {
    type: 'word',
    body
  };
}

export function quotation(body: Array<Value>): Quotation {
  return {
    type: 'quotation',
    body
  };
}

export function definition(
  [keyword, body]: [string, Array<Value>]
): Definition {
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
