#!/usr/bin/env node
const { relative, join, dirname } = require('path');
const Node = require(__dirname + '/../runtimes/node');

const srcFile = process.argv[2];
const root = dirname(join(process.cwd(), relative(process.cwd(), srcFile)));
const runtime = Node(root);
runtime.evaluate(srcFile);
