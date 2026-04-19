import { appConfig, getApiBaseUrl } from '@/lib/env';
import type { ApiEnvelope } from '@/types/catalog';

export async function backendFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: init?.cache ?? 'no-store',
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}.`;

    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      message = `${message} Check whether the backend is running at ${appConfig.browserApiUrl}.`;
    }

    throw new Error(message);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;
  return payload.data;
}
