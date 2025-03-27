'use client'

import {PropsWithChildren, useEffect} from 'react';
import {createTheme, ThemeProvider} from '@mui/material';
import {useAppDispatch} from '@/store/store';
import {CookieKey} from '@/shared/models/cookie.model';
import designTokens from '@/shared/utils/design-tokens';
import { getCookie } from 'cookies-next/client';
import {getCurrentUser} from '@/store/user/actions/thunks/current-user';

type Props = {};

const MainLayout = ({children}: PropsWithChildren<Props>) => {
   const dispatch = useAppDispatch();
   const theme = createTheme(designTokens('dark'));
   
   useEffect(() => {
      const token = getCookie(CookieKey.Token)
      token && dispatch(getCurrentUser());
   }, []);
   
   
   return (
       <div style={{minHeight: '100vh'}}>
          <ThemeProvider theme={theme}>
             {children}
          </ThemeProvider>
       </div>
   );
};

export default MainLayout;
