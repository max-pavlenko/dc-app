import {useTranslations} from 'next-intl';

export type Dictionary = ReturnType<typeof useTranslations<any>>;
