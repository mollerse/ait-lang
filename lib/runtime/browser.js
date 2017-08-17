// @flow

import BaseRuntime from './runtime';
import type { Runtime } from './runtime';

class BrowserRuntimeImpl extends BaseRuntime implements Runtime {
  type: string;

  constructor() {
    super();
    this.type = 'browser';
  }
}

export default function browser(): Runtime {
  return new BrowserRuntimeImpl();
}
