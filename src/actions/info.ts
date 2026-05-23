import type { Args } from '../types/args.js';
import { get } from '../core/req.js';
import { info, success, error } from '../utils/log.js';
import { isWebhookUrl } from '../core/valid.js';
import { exitError } from '../utils/exit.js';
import { getTimeout } from '../utils/cfg.js';

export const handleInfo = async (args: Args): Promise<void> => {
  if (!isWebhookUrl(args.url)) {
    exitError('Invalid webhook URL');
  }

  info(`checking ${args.url}`);

  const timeout = args.timeout === 0 ? await getTimeout() : args.timeout;
  try {
    const res = await get(args.url, timeout);
    
    info(`URL: ${args.url}`);
    info(`Status: ${res.status}`);
    info(`OK: ${res.ok}`);
    info(`Time: ${res.time}ms`);
    
    try {
      const data = JSON.parse(res.text);
      info(`Webhook Info:`);
      info(`  Name: ${data.name || 'N/A'}`);
      info(`  ID: ${data.id || 'N/A'}`);
      info(`  Type: ${data.type || 'N/A'}`);
      info(`  Channel ID: ${data.channel_id || 'N/A'}`);
      info(`  Guild ID: ${data.guild_id || 'N/A'}`);
      info(`  Application ID: ${data.application_id || 'N/A'}`);
    } catch {
      info(`Response: ${res.text}`);
    }
  } catch (err) {
    error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  }
};
