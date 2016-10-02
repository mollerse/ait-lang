// @flow

import path from 'path';
import { readFileSync } from 'fs';
import type { ASTNode } from '../parser/ast';
import parse from '../parser/parse';
import { evaluateDefinition } from './evaluate';
import type { NodeRuntime } from '../runtime/runtime';

export default function loadModule(module: string, runtime: NodeRuntime): void {
  const fullPath = resolveModulePath(module, runtime.root);

  if (typeof fullPath !== 'string') { return; }

  const ext = path.parse(fullPath).ext;

  if (ext === '.js') {
    /* eslint global-require: [0], import/no-dynamic-require: [0] */
    // @FlowIgnore: Non-standard way of using require
    const jsModule = require(fullPath);

    if (typeof jsModule === 'object') {
      const ret = {};
      Object.keys(jsModule).forEach(function(key) {
        if (jsModule[key].type === 'js' && typeof jsModule[key].fn === 'function') {
          ret[key] = jsModule[key];
        } else {
          console.warn(`${key} of module ${module} is not a valid JSFunction, skipping.`);
        }
      });
      runtime.load(ret);
    }
    console.error(`Ait does not support single-function js-modules. You tried to load ${module}.`);
    return;
  } else if (ext === '.ait') {
    const moduleSource = readFileSync(fullPath).toString();
    const moduleAST = parse(moduleSource);

    moduleAST
      .forEach(evaluateModuleASTNode.bind(null, runtime));
    return;
  }
  console.error(`File type ${ext} is not supported. Try loading an .ait or .js file!`);
  return;
}

function resolveModulePath(module: string, root: string): ?string {
  if (module.indexOf('./') === 0) {
    const rootPath = path.parse(root);
    module = path.join(rootPath.dir, rootPath.base, module);
  }
  try {
    // See if it resolves to a module
    return require.resolve(module);
  } catch (e) {
    try {
      // Since it did not resolve to a module, see if it resolves to an ait-file
      return require.resolve(`${module}.ait`);
    } catch (ee) {
      console.error(`Could not load module ${module}`);
    }
  }
  return;
}

function evaluateModuleASTNode(runtime: NodeRuntime, astNode: ASTNode): void {
  switch (astNode.type) {
    case 'load':
      loadModule(astNode.body, runtime);
      break;
    case 'definition':
      const definition = evaluateDefinition(astNode, runtime);
      runtime.load({
        [definition.keyword]: {
          type: 'ait',
          fn: definition.body
        }
      });
      break;
    default:
      console.warn(`Top-level expressions are not allowed in Ait-modules. ${JSON.stringify(astNode)} has been dropped`);
      return;
  }
}
