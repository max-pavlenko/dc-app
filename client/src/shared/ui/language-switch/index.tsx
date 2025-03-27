'use client';

import {Locale} from '@/i18n/request';
import {usePathname, useRouter} from '@/i18n/routing';
import {useLocale} from 'next-intl';
import {useParams} from 'next/navigation';
import * as React from 'react';
import {useState} from 'react';
import {MenuItem} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuDropdown from '@/shared/ui/MenuDropdown';

const LanguageSwitch = () => {
   const router = useRouter();
   const locale = useLocale();
   const pathname = usePathname();
   const params = useParams();
   const [currentLocale, setCurrentLocale] = useState(locale);
   
   const changeLanguage = (newLocale: Locale) => {
      if (newLocale === locale) return;
      setCurrentLocale(newLocale);
      
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      router.replace({pathname, params}, {locale: newLocale});
   };
   
   
   return (
       <MenuDropdown menuIcon={<TranslateIcon/>}>
          <MenuItem selected={currentLocale === Locale.English} onClick={() => changeLanguage(Locale.English)}>
             English
          </MenuItem>
          <MenuItem selected={currentLocale === Locale.Ukrainian} onClick={() => changeLanguage(Locale.Ukrainian)}>
             Українська
          </MenuItem>
          <MenuItem selected={currentLocale === Locale.Deutsch} onClick={() => changeLanguage(Locale.Deutsch)}>
             Deutsch
          </MenuItem>
          <MenuItem selected={currentLocale === Locale.Spanisch} onClick={() => changeLanguage(Locale.Spanisch)}>
             Español
          </MenuItem>
       </MenuDropdown>
   );
};

export default LanguageSwitch;
