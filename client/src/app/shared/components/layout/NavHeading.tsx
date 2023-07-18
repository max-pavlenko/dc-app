import {FC} from 'react'
import {useAppSelector} from "@/store/store";
import {getTimeOfDay} from "@/utils/getTimeOfDay";
import {Typography} from "@mui/material";

type Props = {};

const NavHeading: FC<Props> = ({}) => {
   const {auth: {user}, chat: {chat: {friend}}} = useAppSelector(state => state);
   const isChatWithFriendSelected = !!friend;

   return (
       <header className={`text-[#b9bbbe] text-sm ${isChatWithFriendSelected ? 'font-bold' : 'italic'}`}>
          {isChatWithFriendSelected ? friend.username : `Have a good ${getTimeOfDay()}, ${user?.username}`}
       </header>
   );
};

export default NavHeading;
