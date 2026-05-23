import type { Response } from '../types/res.js';

export const send = async (
  url: string,
  payload: unknown,
  timeout: number
): Promise<Response> => {
  const start = Date.now();
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(id);
    const text = await res.text();

    return {
      ok: res.ok,
      status: res.status,
      text,
      time: Date.now() - start,
    };
  } catch (err) {
    clearTimeout(id);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw err;
  }
};

export const get = async (
  url: string,
  timeout: number
): Promise<Response> => {
  const start = Date.now();
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(id);
    const text = await res.text();

    return {
      ok: res.ok,
      status: res.status,
      text,
      time: Date.now() - start,
    };
  } catch (err) {
    clearTimeout(id);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw err;
  }
};

export const del = async (
  url: string,
  timeout: number
): Promise<Response> => {
  const start = Date.now();
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      signal: controller.signal,
    });

    clearTimeout(id);
    const text = await res.text();

    return {
      ok: res.ok,
      status: res.status,
      text,
      time: Date.now() - start,
    };
  } catch (err) {
    clearTimeout(id);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw err;
  }
};
