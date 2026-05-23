import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Config {
  threads: number;
  delay: number;
  timeout: number;
  retries: number;
  backoff: number;
  messages: {
    spam: string;
    del: string;
    test: string;
    info: string;
    nuke: string;
  };
}

let cached: Config | null = null;

export const load = async (): Promise<Config> => {
  if (cached) return cached;

  const configPath = join(__dirname, '../../config/default.json');
  const content = await readFile(configPath, 'utf-8');
  cached = JSON.parse(content) as Config;
  return cached;
};

export const getMessage = async (action: 'spam' | 'del' | 'test' | 'info' | 'nuke'): Promise<string> => {
  const config = await load();
  return config.messages[action];
};

export const getDelay = async (): Promise<number> => {
  const config = await load();
  return config.delay;
};

export const getThreads = async (): Promise<number> => {
  const config = await load();
  return config.threads;
};

export const getTimeout = async (): Promise<number> => {
  const config = await load();
  return config.timeout;
};
