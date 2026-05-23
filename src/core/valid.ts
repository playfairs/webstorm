export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const isWebhookUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  const parsed = new URL(url);
  return parsed.pathname.includes('webhook') || 
         parsed.hostname.includes('discord') ||
         parsed.hostname.includes('slack');
};
