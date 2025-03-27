'use client';

import {FC} from 'react'
import InvitationsList from "@/code/features/invitations/ui/invitations-list";
import FriendsList from "@/code/features/friends/ui/friends-list";
import AddFriend from '@/code/features/friends/ui/add-friend';

type Props = {};

const FriendsSidebar: FC<Props> = ({}) => {

   return (
       <div className='w-[224px] flex gap-1.5 flex-col py-2 px-2 items-center bg-[#2F3136]'>
          <AddFriend />

          <FriendsList/>
          <InvitationsList/>
       </div>
   );
};

export default FriendsSidebar;
