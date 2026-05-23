import type { Args } from '../types/args.js';
import { del } from '../core/req.js';
import { info, success, error } from '../utils/log.js';
import { isWebhookUrl } from '../core/valid.js';
import { exitError } from '../utils/exit.js';
import { getTimeout } from '../utils/cfg.js';

export const handleDel = async (args: Args): Promise<void> => {
  if (!isWebhookUrl(args.url)) {
    exitError('Invalid webhook URL');
  }

  info(`Deleting ${args.url}...`);

  const timeout = args.timeout === 0 ? await getTimeout() : args.timeout;
  try {
    const res = await del(args.url, timeout);
    
    if (res.ok) {
      success(`Deleted successfully (${res.status}) - ${res.time}ms`);
    } else {
      error(`Failed to delete (${res.status}) - ${res.time}ms`);
      error(res.text);
    }
  } catch (err) {
    error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  }
};
