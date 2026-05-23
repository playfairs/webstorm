export const exit = (code: number): never => {
  process.exit(code);
  throw new Error('Unreachable');
};

export const exitSuccess = (): never => {
  exit(0);
  throw new Error('Unreachable');
};

export const exitError = (msg: string): never => {
  console.error(msg);
  exit(1);
  throw new Error('Unreachable');
};
