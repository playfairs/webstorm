import type { Args } from '../types/args.js';

export const parseArgs = (
  url: string,
  options: {
    threads?: string;
    delay?: string;
    msg?: string;
    json?: string;
    timeout?: string;
  }
): Args => {
  const threads = options.threads ? parseInt(options.threads, 10) : undefined;
  const delay = options.delay ? parseInt(options.delay, 10) : undefined;
  const timeout = options.timeout ? parseInt(options.timeout, 10) : undefined;

  if (threads !== undefined && (isNaN(threads) || threads < 1 || threads > 100)) {
    throw new Error('Threads must be between 1 and 100');
  }

  if (delay !== undefined && (isNaN(delay) || delay < 0)) {
    throw new Error('Delay must be a positive number');
  }

  if (timeout !== undefined && (isNaN(timeout) || timeout < 1000)) {
    throw new Error('Timeout must be at least 1000ms');
  }

  return {
    url,
    threads: threads || 0,
    delay: delay || 0,
    msg: options.msg,
    json: options.json,
    timeout: timeout || 0,
  };
};
