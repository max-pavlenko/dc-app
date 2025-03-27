import { DEFAULT_LOCALE, LOCALE_OPTIONS, Locale } from '@/i18n/request';
import { CookieKey } from '@/shared/models/cookie.model';
import { getCookie } from 'cookies-next';
import { createTranslator } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: LOCALE_OPTIONS,
  defaultLocale: Locale.English,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

async function loadMessages(locale: string) {
  try {
    return await import(`../../messages/${locale}.json`);
  } catch (error) {
    console.error(`Error loading translations for locale: ${locale}`, error);
    return {};
  }
}

export async function getTranslation(namespace?: string) {
  const locale = (await getCookie(CookieKey.Locale)) || DEFAULT_LOCALE;
  const messages = await loadMessages(locale);
  return createTranslator({ locale, messages, namespace });
}
