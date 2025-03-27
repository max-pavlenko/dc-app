'use client';

import {useEffect, useState} from 'react';
import {useRouter} from '@/i18n/routing';
import toast from 'react-hot-toast';
import {connectSocketServer} from '@/api/socket.io/connection';
import {store, useActions} from '@/store/store';
import PrimaryButton from '@/shared/ui/PrimaryButton';
import {useTranslations} from 'next-intl';
import {getCookie} from 'cookies-next/client';
import {CookieKey} from '@/shared/models/cookie.model';
import {UserResponse} from '@/store/user/types';
import axios from 'axios';
import {setCookie} from 'cookies-next';

const AuthStatusPage = () => {
   const router = useRouter();
   const [googleCode, setGoogleCode] = useState<null | string>(null);
   const t = useTranslations();
   const {SET_USER} = useActions();
   
   useEffect(() => {
      const code = getCookie(CookieKey.GoogleCode) ?? '';
      setGoogleCode(code);
      (async function () {
         if (!code) {
            router.push('/login');
            return toast.error('Google authentication failed. Try again...');
         }
         const {data} = await axios.post(`http://localhost:5000/api/auth/google`, {
            code,
         });
         
         if (!data) throw new Error((data?.message ?? '') as string);
         
         const {token, user} = data as { token: string; user: UserResponse };
         if (!user) {
            router.push('/login');
            return toast.error('Error occurred during authentication');
         } else {
            SET_USER(user);
            setCookie(CookieKey.Token, token);
            connectSocketServer({jwtToken: token, state: store});
            await Notification.requestPermission();
            router.push('/dashboard');
         }
      })();
   }, []);
   
   if (googleCode === null) return <div>Loading...</div>;
   else if (!googleCode) {
      return (
          <div className="text-red-700 grid gap-5 p-5">
             Authentication failed. Try again...
             <PrimaryButton onClick={() => router.push('/login')}>{t('Pages.Register.logIn')}</PrimaryButton>
          </div>
      );
   } else {
      return <div>Authenticating...</div>;
   }
};

export default AuthStatusPage;
