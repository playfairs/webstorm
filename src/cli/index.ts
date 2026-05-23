#!/usr/bin/env node

import { Command } from 'commander';
import { register } from './cmds.js';
import { exit } from '../utils/exit.js';

const program = new Command();

program
  .name('webstorm')
  .description('Webhook testing CLI tool')
  .version('1.0.0');

register(program);

program.parse();

if (!process.argv.slice(2).length) {
  program.outputHelp();
  exit(0);
}
