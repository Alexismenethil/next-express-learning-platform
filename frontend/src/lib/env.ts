export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Product Catalog Learning Platform',
  browserApiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
  internalApiUrl:
    process.env.INTERNAL_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:4000/api',
};

export function getApiBaseUrl() {
  return typeof window === 'undefined' ? appConfig.internalApiUrl : appConfig.browserApiUrl;
}
