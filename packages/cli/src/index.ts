#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { add } from './commands/add.js';
import { getVersion } from './version.js';
import { createCommand } from './commands/create.js'; // Import createCommand

const program = new Command();

program
  .version(getVersion())
  .description('OpenReactHub CLI - Manage React components and utilities');

// Register createCommand
program.addCommand(createCommand); // Add the command as is

// Add the add command
program
  .command('add <component...>')
  .description('Add a component to your project (npm package or GitHub path)')
  .option('-f, --force', 'Force installation even if the component already exists')
  .action((componentParts) => {
    const fullComponentPath = componentParts.join(' ');
    add(fullComponentPath)
      .then(() => {})
      .catch((error) => {
        console.error(chalk.red('Error adding component:'), error.message);
        process.exit(1);
      });
  });

program.on('command:*', () => {
  console.error(chalk.red('Invalid command: %s\nSee --help for a list of available commands.'), program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
