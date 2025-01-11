#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const add_1 = require("./commands/add");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .description('OpenReactHub CLI - Manage React components and utilities');
program
    .command('add <component>')
    .description('Add a component to your project')
    .action(add_1.add);
program.parse(process.argv);
