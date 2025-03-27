'use client';

import {FC} from 'react';
import UnderlineHighlight from '@/shared/ui/UnderlineHighlight';
import {useTranslations} from 'next-intl';
import {useAppSelector} from '@/store/store';
import AddFriend from '@/code/features/friends/ui/add-friend';
import {twMerge} from 'tailwind-merge';

type Props = {};

const WelcomeMessage: FC<Props> = ({}) => {
   const t = useTranslations();
   const {friends} = useAppSelector(state => state.friends);
   const hasFriends = friends.length > 0;
   
   return (
       <div className="flex flex-1 items-center justify-center">
          <div className={twMerge(hasFriends && '!gap-2', 'text-lg grid gap-3.5 w-max text-center')}>
             {!hasFriends ? (
                 <>
                    <span className='leading-5'>{t('Pages.Dashboard.noConversations')}</span>
                    <UnderlineHighlight className="w-[40%] h-[3px]"/>
                    <AddFriend/>
                 </>
             ) : <>
                {t('Pages.Dashboard.title')}
                <UnderlineHighlight className="w-[40%] h-[3px]"/>
             </>}
          </div>
       </div>
   );
};

export default WelcomeMessage;
