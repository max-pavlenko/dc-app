import {DEFAULT_LOCALE} from '@/i18n/request';
import {getCookie, setCookie} from 'cookies-next';
import {CookieKey} from '@/shared/models/cookie.model';
import {NextApiRequest} from 'next';
import {NextResponse} from 'next/server';

export async function GET(req: NextApiRequest) {
   const {searchParams} = new URL(req.url!);
   
   const code = searchParams.get('code');
   const lang = (await getCookie(CookieKey.Locale)) || DEFAULT_LOCALE;
   
   if (!code) {
      return NextResponse.redirect(`http://localhost:3000/${lang}/auth-status`, {
         status: 401,
      });
   }
   
   try {
      const res = NextResponse.redirect(`http://localhost:3000/${lang}/auth-status`, {
         status: 301,
      });
      
      res.cookies.set(CookieKey.GoogleCode, code, {
         path: '/',
         maxAge: 60
      })
      setCookie(CookieKey.GoogleCode, code, {
         path: '/',
         maxAge: 60
      });
      
      return res;
   } catch (error: unknown) {
      console.log(error, 'error');
      return new Response((error as Error)?.message ?? '', {
         status: 500,
      });
   }
}
