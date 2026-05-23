import type { Args } from '../types/args.js';
import { send } from '../core/req.js';
import { buildPayload } from '../core/hook.js';
import { info, success, error } from '../utils/log.js';
import { isWebhookUrl } from '../core/valid.js';
import { exitError } from '../utils/exit.js';
import { getTimeout } from '../utils/cfg.js';

export const handleTest = async (args: Args): Promise<void> => {
  if (!isWebhookUrl(args.url)) {
    exitError('Invalid webhook URL');
  }

  const payload = buildPayload('test');

  info(`Testing ${args.url}...`);

  const timeout = args.timeout === 0 ? await getTimeout() : args.timeout;
  try {
    const res = await send(args.url, payload, timeout);
    
    if (res.ok) {
      success(`Success (${res.status}) - ${res.time}ms`);
    } else {
      error(`Failed (${res.status}) - ${res.time}ms`);
      error(res.text);
    }
  } catch (err) {
    error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  }
};
