import {FC} from 'react'
import FriendInvitation from "@/app/features/invitations/components/FriendInvitation";
import {useAppSelector} from "@/store/store";
import AnimateVisibilityList from "@/app/features/friends/components/AnimateVisibilityList";

type Props = {};

const InvitationsList: FC<Props> = ({}) => {
   const {friendInvitations} = useAppSelector(state => state.friends);
   const areFriendInvitesExistent = friendInvitations?.length > 0;

   return (
       <AnimateVisibilityList isVisible={areFriendInvitesExistent} title='Invitations'>
          <ul className='flex-col flex items-center'>
             {friendInvitations?.map(invitation => (
                 <li key={invitation.id}>
                    <FriendInvitation invitation={invitation} onAcceptFriendInvitation={() => {}} onRejectFriendInvitation={() => {}}/>
                 </li>
             ))}
          </ul>
       </AnimateVisibilityList>
   );
};

export default InvitationsList;
