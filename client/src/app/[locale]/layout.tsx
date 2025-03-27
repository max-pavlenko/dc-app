import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ReactNode} from 'react';

export default async function RootLocaleLayout({children,}: Readonly<{
   children: ReactNode;
}>) {
   const messages = await getMessages();
   return (
       <>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
       </>
   );
}

