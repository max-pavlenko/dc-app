import { DEFAULT_LOCALE } from '@/i18n/request';
import { routing } from '@/i18n/routing';
import { extractLocaleAndPathname } from '@/shared/utils/url';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";
import { CookieKey } from './shared/models/cookie.model';
import {cookies} from 'next/headers';

const intlMiddleware = createMiddleware(routing);

const PRIVATE_ROUTES = ['/dashboard', '/profile', '/settings', ];
const AUTH_ROUTES = ['/login', '/register', ];

export const config = {
   matcher: [
      '/', // Root
      '/((?!api|_next|favicon.ico|robots.txt|sitemap.xml).*)', // Exclude API and other static assets
   ],
};

export default async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
   const { pathname } = request.nextUrl;
   const cookieStore = await cookies();
   const accessToken = cookieStore.get(CookieKey.Token)?.value;
   let { pathnameWithoutLocale, locale } = extractLocaleAndPathname(pathname);
   const savedLocale = cookieStore.get(CookieKey.Locale)?.value;
   let redirectURL = '';
   
   if (!locale || !routing.locales.includes(locale as never)) return NextResponse.redirect(`http://localhost:3000/${DEFAULT_LOCALE}${pathnameWithoutLocale}`);
   locale = locale || savedLocale || DEFAULT_LOCALE;
   
   const isPrivateRoute = PRIVATE_ROUTES.some(route => pathnameWithoutLocale.startsWith(route));
   
   if ((isPrivateRoute && !accessToken)) redirectURL = `/login`;
   if (redirectURL) return NextResponse.redirect(`http://localhost:3000/${locale}${redirectURL}`);
   
   return intlMiddleware(request);
}
