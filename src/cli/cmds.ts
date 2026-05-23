import { Command } from 'commander';
import { handleSpam } from '../actions/spam.js';
import { handleDel } from '../actions/del.js';
import { handleTest } from '../actions/test.js';
import { handleInfo } from '../actions/info.js';
import { handleNuke } from '../actions/nuke.js';
import { handleSend } from '../actions/send.js';
import { parseArgs } from './args.js';
import { show } from './banner.js';
import { exitError } from '../utils/exit.js';

export const register = (program: Command): void => {
  show();

  program
    .command('spam <url>')
    .option('--threads <number>', 'Concurrent requests')
    .option('--delay <number>', 'Delay between requests (ms)')
    .option('--msg <text>', 'Custom message')
    .option('--json <file>', 'JSON payload file')
    .option('--timeout <number>', 'Request timeout (ms)')
    .action(async (url, options) => {
      try {
        const args = parseArgs(url, options);
        await handleSpam(args);
      } catch (err) {
        exitError(err instanceof Error ? err.message : String(err));
      }
    });

  program
    .command('del <url>')
    .option('--timeout <number>', 'Request timeout (ms)')
    .action(async (url, options) => {
      try {
        const args = parseArgs(url, { ...options, threads: '1', delay: '0' });
        await handleDel(args);
      } catch (err) {
        exitError(err instanceof Error ? err.message : String(err));
      }
    });

  program
    .command('test <url>')
    .option('--timeout <number>', 'Request timeout (ms)')
    .action(async (url, options) => {
      try {
        const args = parseArgs(url, { ...options, threads: '1', delay: '0' });
        await handleTest(args);
      } catch (err) {
        exitError(err instanceof Error ? err.message : String(err));
      }
    });

  program
    .command('info <url>')
    .option('--timeout <number>', 'Request timeout (ms)')
    .action(async (url, options) => {
      try {
        const args = parseArgs(url, { ...options, threads: '1', delay: '0' });
        await handleInfo(args);
      } catch (err) {
        exitError(err instanceof Error ? err.message : String(err));
      }
    });

  program
    .command('nuke <url>')
    .option('--threads <number>', 'Concurrent requests')
    .option('--delay <number>', 'Delay between requests (ms)')
    .option('--msg <text>', 'Custom message')
    .option('--json <file>', 'JSON payload file')
    .option('--timeout <number>', 'Request timeout (ms)')
    .action(async (url, options) => {
      try {
        const args = parseArgs(url, options);
        await handleNuke(args);
      } catch (err) {
        exitError(err instanceof Error ? err.message : String(err));
      }
    });

  program
    .command('send <url> <message>')
    .option('--timeout <number>', 'Request timeout (ms)')
    .action(async (url, message, options) => {
      try {
        const args = parseArgs(url, { ...options, msg: message, threads: '1', delay: '0' });
        await handleSend(args);
      } catch (err) {
        exitError(err instanceof Error ? err.message : String(err));
      }
    });
};
