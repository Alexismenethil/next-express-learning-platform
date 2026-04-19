import { appConfig } from '@/lib/env';

function getApiOrigin() {
  const apiBase =
    typeof window === 'undefined' ? appConfig.internalApiUrl : appConfig.browserApiUrl;

  return apiBase.replace(/\/api\/?$/, '');
}

export function resolveMediaUrl(src?: string | null) {
  if (!src) {
    return undefined;
  }

  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('blob:') ||
    src.startsWith('data:')
  ) {
    return src;
  }

  if (src.startsWith('/uploads/')) {
    return `${getApiOrigin()}${src}`;
  }

  return src;
}
