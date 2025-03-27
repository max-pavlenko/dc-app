import { getRequestConfig } from 'next-intl/server';

export enum Locale {
  English = 'en',
  Ukrainian = 'uk',
  Deutsch = 'de',
  Spanisch = 'es',
}

export const DEFAULT_LOCALE = Locale.English;
export const LOCALE_OPTIONS = Object.values(Locale);

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !LOCALE_OPTIONS.includes(locale as Locale)) locale = DEFAULT_LOCALE;

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    locale,
  };
});
