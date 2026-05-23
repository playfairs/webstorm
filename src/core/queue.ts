export class Queue {
  private running: number;
  private max: number;
  private queue: Array<() => Promise<void>>;

  constructor(max: number) {
    this.running = 0;
    this.max = max;
    this.queue = [];
  }

  add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const run = async (): Promise<void> => {
        this.running += 1;
        try {
          const result = await fn();
          resolve(result);
        } catch (err) {
          reject(err);
        } finally {
          this.running -= 1;
          this.next();
        }
      };

      this.queue.push(run);
      this.next();
    });
  }

  private next(): void {
    if (this.running < this.max && this.queue.length > 0) {
      const fn = this.queue.shift();
      if (fn) fn();
    }
  }
}
