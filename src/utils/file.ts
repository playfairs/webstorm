import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

export const readJson = async (path: string): Promise<unknown> => {
  if (!existsSync(path)) {
    throw new Error(`File not found: ${path}`);
  }
  const content = await readFile(path, 'utf-8');
  return JSON.parse(content);
};
