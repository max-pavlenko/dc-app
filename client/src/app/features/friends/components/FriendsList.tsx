import {FC} from 'react'
import FriendButton from "@/app/features/friends/components/FriendButton";
import {useActions, useAppSelector} from "@/store/store";
import AnimateVisibilityList from "@/app/features/friends/components/AnimateVisibilityList";
import {initialUpdateDirectChatHistory} from "@/api/socket.io/connection";
import {Friend} from "@/store/friends/types";
import {CHAT_TYPES} from "@/store/chat/types";

type Props = {};

const FriendsList: FC<Props> = ({}) => {
   const {friends: {friends, onlineUsers}, chat: {chat: {friend: collocutor}, messages}} = useAppSelector(state => state);
   const {SET_CHAT_DETAILS, SET_MESSAGES} = useActions();

   const friendsWithOnlineStatus = friends.map(friend => {
      return {
         ...friend, isOnline: onlineUsers[friend.userID] != null
      }
   });

   function handleFriendButtonClick(friend: Friend) {
      return ()=> {
         if (collocutor?.userID === friend.userID) {
            SET_MESSAGES([...messages]); // to trigger useEffect in Messages and scroll down messages
            return;
         }

         SET_CHAT_DETAILS({
            type: CHAT_TYPES.DIRECT,
            friend
         });
         initialUpdateDirectChatHistory({friendID: friend.userID});
      }
   }

   const areFriendsExistent = friends.length > 0;

   return (
       <AnimateVisibilityList isVisible={areFriendsExistent} title='Private Messages'>
          <ul className={`flex-1 mt-1.5 flex gap-1.5 flex-col overflow-y-auto friends-list`}>
             {friendsWithOnlineStatus.map((friend) => (
                 <li key={friend.userID}>
                    <FriendButton
                        variant={friend.userID === collocutor?.userID ? 'outlined' : 'text'}
                        onClick={handleFriendButtonClick(friend)}
                        friend={friend}
                    />
                 </li>
             ))}
          </ul>
       </AnimateVisibilityList>
   );
};

export default FriendsList;
