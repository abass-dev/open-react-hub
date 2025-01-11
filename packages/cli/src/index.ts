#!/usr/bin/env node
import { Command } from 'commander';
import { add } from './commands/add';

const program = new Command();

program
  .version('1.0.0')
  .description('OpenReactHub CLI - Manage React components and utilities');

program
  .command('add <component>')
  .description('Add a component to your project')
  .action(add);

program.parse(process.argv);
