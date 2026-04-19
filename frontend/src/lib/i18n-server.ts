import { cookies } from 'next/headers';

import { resolveLanguage } from './i18n';

export async function getCurrentLanguage() {
  const cookieStore = await cookies();
  return resolveLanguage(cookieStore.get('learning-platform-language')?.value);
}
