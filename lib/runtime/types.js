export type EvaluatedValue = string | number | boolean | Array<EvaluatedValue>;

export type JSFunction = {
  type: 'js',
  name: string,
  fn: Function
};

export type AitWord = {
  type: 'ait',
  name: string,
  fn: Array<EvaluatedValue>
};

export type Lexicon = { [key: string]: AitWord | JSFunction };

export interface Stack {
  resolve(): void,
  fork(i: number): void,
  push(v: mixed): void,
  pop(): mixed,
  length(): number,
  stack(): Array<mixed>
}

export interface BrowserRuntime {
  type: 'browser'
}

export interface NodeRuntime {
  type: 'node',
  root: string
}

export type Runtime = BrowserRuntime | NodeRuntime;
