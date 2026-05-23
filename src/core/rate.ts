export class RateLimiter {
  private tokens: number;
  private max: number;
  private refill: number;
  private last: number;

  constructor(max: number, refillMs: number) {
    this.tokens = max;
    this.max = max;
    this.refill = refillMs;
    this.last = Date.now();
  }

  async acquire(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.last;
    this.tokens = Math.min(this.max, this.tokens + elapsed / this.refill);
    this.last = now;

    if (this.tokens < 1) {
      const wait = (1 - this.tokens) * this.refill;
      await new Promise(r => setTimeout(r, wait));
      this.tokens = 1;
    }

    this.tokens -= 1;
  }
}
