import {FC} from 'react'
import {useAppSelector} from "@/store/store";
import {getTimeOfDayKey} from "@/shared/utils/time";
import {Avatar, Typography} from '@mui/material';
import {useTranslations} from 'next-intl';

type Props = {};

const NavHeading: FC<Props> = ({}) => {
   const {auth, chat: {chat: {friend}}} = useAppSelector(state => state);
   const isChatWithFriendSelected = !!friend;
   const t = useTranslations('Common');

   return (
       <header className={`text-[#b9bbbe] text-sm ${isChatWithFriendSelected ? 'font-bold' : 'italic'}`}>
          {isChatWithFriendSelected ? (
              <div className='flex gap-2 text-base items-center'>
                 <Avatar sx={{width: '22px', height: '22px'}} alt={friend.username} />
                 {friend.username}
              </div>
          ) : t('greeting', {
             timeOfDay: t(`timeOfDay.${getTimeOfDayKey()}`),
             username: auth.user?.username || 'Guest',
          })}
       </header>
   );
};

export default NavHeading;
