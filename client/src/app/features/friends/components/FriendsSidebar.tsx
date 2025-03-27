import {FC} from 'react'
import AddFriendButton from "@/app/features/friends/components/AddFriendButton";
import InvitationsList from "@/app/features/invitations/components/InvitationsList";
import FriendsList from "@/app/features/friends/components/FriendsList";

type Props = {};

const FriendsSidebar: FC<Props> = ({}) => {

   return (
       <div className='w-[224px] flex gap-1.5 flex-col py-2 px-2 items-center bg-[#2F3136]'>
          <AddFriendButton/>

          <FriendsList/>
          <InvitationsList/>
       </div>
   );
};

export default FriendsSidebar;
