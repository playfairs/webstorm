export const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

export const hasEnv = (key: string): boolean => {
  return key in process.env;
};
