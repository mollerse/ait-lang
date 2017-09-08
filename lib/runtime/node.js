// @flow
import type { Runtime } from './runtime';

import { readFileSync } from 'fs';
import BaseRuntime from './runtime';
import moduleLoader from './moduleLoader';

class NodeRuntimeImpl extends BaseRuntime implements Runtime {
  type: string;
  root: string;

  constructor(root: string) {
    super();
    this.type = 'node';
    this.root = root;
  }

  evaluate(path: string) {
    const src = readFileSync(path, 'utf8');
    super.evaluate(src);
  }

  loadModule(module) {
    const words = moduleLoader(module, this.root);

    if (!Array.isArray(words)) {
      throw new Error(words.cause);
    }

    words.forEach(word => {
      this.lexicon[word.name] = word;
    });
  }
}

export default function node(cwd: string): Runtime {
  return new NodeRuntimeImpl(cwd);
}
