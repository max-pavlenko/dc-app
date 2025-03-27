'use client';
import '@/styles/globals.scss';
import MainLayout from '@/shared/ui/layout/MainLayout';
import {Toaster} from 'react-hot-toast';
import {ReactNode} from 'react';
import {store} from '@/store/store';
import {Provider} from 'react-redux';

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
   return (
       <html suppressHydrationWarning>
       <head>
          <meta name="description" content="Online communication platform"/>
          <title>Concord Platform</title>
       </head>
       <body>
       <Provider store={store}>
          <MainLayout>
             <Toaster position="top-right"/>
             {children}
          </MainLayout>
       </Provider>
       </body>
       </html>
   );
}
