'use client';

import {FC} from 'react';
import Friend from '@/code/features/friends/ui/friend';
import {useActions, useAppSelector} from '@/store/store';
import AnimateVisibility from '@/code/features/friends/ui/animate-visibility';
import {initialUpdateDirectChatHistory} from '@/api/socket.io/connection';
import {Friend as AppFriend} from '@/store/friends/types';
import {CHAT_TYPES} from '@/store/chat/types';
import {useTranslations} from 'next-intl';

type Props = {};

const FriendsList: FC<Props> = ({}) => {
   const {friends: {friends, onlineUsers}, chat: {chat: {friend}, messages}} = useAppSelector(state => state);
   const {SET_CHAT_DETAILS, SET_MESSAGES} = useActions();
   const t = useTranslations();
   
   const friendsWithOnlineStatus = friends.map(friend => {
      return {
         ...friend, isOnline: onlineUsers[friend.userID] != null
      };
   });
   
   function handleFriendButtonClick(f: AppFriend) {
      return () => {
         if (friend?.userID === f.userID) {
            SET_MESSAGES([...messages]); // to trigger useEffect in Messages and scroll down messages
            return;
         }
         
         SET_CHAT_DETAILS({
            type: CHAT_TYPES.DIRECT,
            friend: f
         });
         initialUpdateDirectChatHistory({friendID: f.userID});
      };
   }
   
   const areFriendsExistent = friends.length > 0;
   
   return (
       <AnimateVisibility className='w-full' isVisible={areFriendsExistent} title={t('Common.conversations')}>
          <ul className={`flex-1 mt-1.5 flex gap-1.5 flex-col overflow-y-auto friends-list`}>
             {friendsWithOnlineStatus.map((f) => (
                 <li key={f.userID}>
                    <Friend
                        variant={f.userID === friend?.userID ? 'outlined' : 'text'}
                        onClick={handleFriendButtonClick(f)}
                        friend={f}
                    />
                 </li>
             ))}
          </ul>
       </AnimateVisibility>
   );
};

export default FriendsList;
