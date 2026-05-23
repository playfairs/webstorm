export interface WebhookPayload {
  content?: string;
  username?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
  }>;
}
