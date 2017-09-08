// @flow

import path from 'path';
import { readFileSync } from 'fs';

import aitFault from '../aitFault';
import parse from '../parser/parse';

import type { AitFault } from '../aitFault';
import type { JSWord, AitWord } from './lexicon';
import { aitWord } from './lexicon';

function isRelative(path) {
  return path[0] === '.';
}

function resolveModulePath(module: string, root: string): string | AitFault {
  // Redefine modulepath to absolute path if it is a relative path
  if (isRelative(module)) {
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
      return aitFault(`Could not load module ${module}`);
    }
  }
}

export default function loadModule(
  module: string,
  root: string
): Array<JSWord | AitWord> | AitFault {
  const fullPath = resolveModulePath(module, root);

  if (typeof fullPath !== 'string') {
    return fullPath;
  }

  const ext = path.parse(fullPath).ext;

  if (ext === '.js') {
    /* eslint global-require: [0], import/no-dynamic-require: [0] */
    // @FlowIgnore: Non-standard way of using require
    const moduleSource = require(fullPath);

    let jsModule: Array<JSWord | AitWord> = [];

    if (typeof moduleSource !== 'object') {
      return aitFault(
        `Ait does not support single-function js-modules. You tried to load ${module}.`
      );
    }

    for (let key of Object.keys(moduleSource)) {
      const word = moduleSource[key];
      if (word.type === 'js' && typeof word.fn === 'function' && typeof word.name === 'string') {
        jsModule.push(word);
      } else {
        return aitFault(`${key} of module ${module} is not a valid FFI JSWord.`);
      }
    }
    return jsModule;
  } else if (ext === '.ait') {
    const moduleSource = readFileSync(fullPath, 'utf8');

    const parsedAitModule = parse(moduleSource);

    if (!Array.isArray(parsedAitModule)) {
      return parsedAitModule;
    }

    let aitModule: Array<JSWord | AitWord> = [];

    for (let node of parsedAitModule) {
      if (node.type === 'definition') {
        aitModule.push(aitWord(node));
      } else if (node.type === 'load') {
        const maybeModule = loadModule(node.body, root);
        if (!Array.isArray(maybeModule)) {
          return maybeModule;
        } else {
          aitModule.concat(maybeModule);
        }
      }
    }
    return aitModule;
  }

  return aitFault(`File type ${ext} is not supported. Try loading an .ait or .js file!`);
}
