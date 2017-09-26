// @flow
export type AitString = {
  type: 'string',
  body: string
};

export type AitBool = {
  type: 'bool',
  body: boolean
};

export type AitNumber = {
  type: 'number',
  body: number
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
  body: {|
    keyword: string,
    body: Array<Value>
  |}
};

export type LoadDirective = {
  type: 'load',
  body: string
};

export type Var = {
  type: 'var',
  body: string
};

export type GlobalVar = {
  type: 'globalVar',
  body: string
};

// Generic value type for FFI
export type AitValue = {
  type: 'value',
  body: mixed
};

export type Value = AitBool | AitString | AitNumber | Word | Quotation | Var | GlobalVar | AitValue;
export type ASTNode = Value | Definition | LoadDirective;

export function primitiveString(body: string): AitString {
  return {
    type: 'string',
    body
  };
}

export function primitiveBoolean(body: 'true' | 'false'): AitBool {
  return {
    type: 'bool',
    body: body === 'true'
  };
}

export function primitiveNumber(body: string): AitNumber {
  return {
    type: 'number',
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
    body: body.reverse()
  };
}

export function quotationNonReversed(body: Array<Value>): Quotation {
  return {
    type: 'quotation',
    body
  };
}

export function definition([keyword, body]: [string, Array<Value>]): Definition {
  return {
    type: 'definition',
    body: { keyword, body: body.reverse() }
  };
}

export function loadDirective(body: string): LoadDirective {
  return {
    type: 'load',
    body
  };
}

export function aitVar(body: string): Var {
  return {
    type: 'var',
    body
  };
}

export function aitGlobalVar(body: string): GlobalVar {
  return {
    type: 'globalVar',
    body
  };
}

export function aitValue(body: mixed): AitValue {
  return {
    type: 'value',
    body
  };
}
