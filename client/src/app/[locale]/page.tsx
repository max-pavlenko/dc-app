'use client';

import {useTranslations} from 'next-intl';
import {IoMdArrowRoundForward} from 'react-icons/io';
import Redirect from '@/code/features/auth/components/redirect';
import { useEffect } from 'react';
import {useRouter} from '@/i18n/routing';

export default function Home() {
   const t = useTranslations('Pages.Home');
   
   return (
       <main
           className={`flex min-h-screen flex-col items-center justify-center p-24`}
       >
          <div className="relative flex place-items-center after:pointer-events-none before:pointer-events-none before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
             <h2 className="font-bold grid gap-6 justify-items-center text-4xl">
                {t('title')}
                <br/>
                <div className="flex items-center gap-2">
                   <Redirect className='!text-lg' href="/login">{t('cta')}</Redirect>
                   <IoMdArrowRoundForward />
                </div>
             </h2>
          </div>
       </main>
   );
}
