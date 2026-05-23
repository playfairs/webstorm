import type { WebhookPayload } from '../types/hook.js';

export const buildPayload = (
  msg?: string,
  custom?: unknown
): WebhookPayload => {
  if (custom) return custom as WebhookPayload;
  if (msg) return { content: msg };
  return { content: 'test' };
};
