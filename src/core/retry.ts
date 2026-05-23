export const retry = async <T>(
  fn: () => Promise<T>,
  max: number,
  backoff: number
): Promise<T> => {
  let last: Error | undefined;

  for (let i = 0; i < max; i++) {
    try {
      return await fn();
    } catch (err) {
      last = err instanceof Error ? err : new Error(String(err));
      if (i < max - 1) {
        await new Promise(r => setTimeout(r, backoff * (i + 1)));
      }
    }
  }

  throw last;
};
