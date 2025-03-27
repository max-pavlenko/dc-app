'use client';

import {FC} from 'react'
import FriendInvitation from "@/code/features/invitations/ui/friend-invitation";
import {useAppSelector} from "@/store/store";
import AnimateVisibility from "@/code/features/friends/ui/animate-visibility";

type Props = {};

const InvitationsList: FC<Props> = ({}) => {
   const {friendInvitations} = useAppSelector(state => state.friends);
   const areFriendInvitesExistent = friendInvitations?.length > 0;

   return (
       <AnimateVisibility className='mt-auto mb-4 w-full' isVisible={areFriendInvitesExistent} title='Invitations'>
          <ul className='flex-col flex items-center'>
             {friendInvitations?.map(invitation => (
                 <li key={invitation.id}>
                    <FriendInvitation invitation={invitation} onAcceptFriendInvitation={() => {}} onRejectFriendInvitation={() => {}}/>
                 </li>
             ))}
          </ul>
       </AnimateVisibility>
   );
};

export default InvitationsList;
