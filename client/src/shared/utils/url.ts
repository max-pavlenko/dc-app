export function extractLocaleAndPathname(url: string): { locale: string | null; pathnameWithoutLocale: string } {
  const match = url.match(/^\/([a-z]{2,4})(\/.*)?$/);
  if (match) {
    const locale = match[1];
    const pathnameWithoutLocale = match[2] || '/';
    return { locale, pathnameWithoutLocale };
  }
  return { locale: null, pathnameWithoutLocale: url };
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
