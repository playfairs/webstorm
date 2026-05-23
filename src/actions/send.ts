import type { Args } from '../types/args.js';
import { send } from '../core/req.js';
import { buildPayload } from '../core/hook.js';
import { info, success, error } from '../utils/log.js';
import { isWebhookUrl } from '../core/valid.js';
import { exitError } from '../utils/exit.js';
import { getTimeout } from '../utils/cfg.js';

export const handleSend = async (args: Args): Promise<void> => {
  if (!isWebhookUrl(args.url)) {
    exitError('Invalid webhook URL');
  }

  const payload = buildPayload(args.msg || 'hello');

  info(`Sending to ${args.url}...`);

  const timeout = args.timeout === 0 ? await getTimeout() : args.timeout;
  try {
    const res = await send(args.url, payload, timeout);
    
    if (res.ok) {
      success(`Sent successfully (${res.status}) - ${res.time}ms`);
    } else {
      error(`Failed to send (${res.status}) - ${res.time}ms`);
      error(res.text);
    }
  } catch (err) {
    error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  }
};
