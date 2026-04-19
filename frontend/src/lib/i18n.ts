export type Language = 'es' | 'en';

export const languageCookieName = 'learning-platform-language';

export function resolveLanguage(value?: string | null): Language {
  return value === 'en' ? 'en' : 'es';
}

export function t(language: Language, spanish: string, english: string) {
  return language === 'es' ? spanish : english;
}
