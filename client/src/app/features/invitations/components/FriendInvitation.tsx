import {FC, useState} from 'react'
import {Avatar, Box, Typography} from "@mui/material";
import InvitationDecisionButtons from "@/app/features/invitations/components/InvitationDecisionButtons";
import {useAcceptFriendInvitationMutation, useRejectFriendInvitationMutation} from '@/app/features/invitations/services/InvitationsService';
import {FriendInvitation} from "@/store/friends/types";

type friendInvitationHandler = ({id}: { id: string }) => void;
type Props = {
   invitation: FriendInvitation;
   onAcceptFriendInvitation: friendInvitationHandler;
   onRejectFriendInvitation: friendInvitationHandler;
};

const FriendInvitation: FC<Props> = ({invitation: {id, sender: {username}}, onRejectFriendInvitation, onAcceptFriendInvitation}) => {
   const [areDecisionButtonsDisabled, setAreDecisionButtonsDisabled] = useState(false);
   const [acceptFriendInvitation, {isLoading: isAcceptingIvite}] = useAcceptFriendInvitationMutation();
   const [rejectFriendInvitation, {isLoading: isRejectingIvite}] = useRejectFriendInvitationMutation();

   const handleAcceptInvitation = () => {
      onAcceptFriendInvitation({id});
      acceptFriendInvitation({inviteID: id});
      setAreDecisionButtonsDisabled(true);
   };

   const handleRejectInvitation = () => {
      onRejectFriendInvitation({id});
      rejectFriendInvitation({inviteID: id});
      setAreDecisionButtonsDisabled(true);
   };

   return (
       <Box className='w-full h-10 mt-2.5 gap-1.5 flex items-center justify-between'>
          <Avatar sx={{width: '33px', height: '33px'}} alt={username}/>
          <Typography className='ml-2 font-bold text-[#8e9297] flex-1' variant="subtitle1">
             {username}
          </Typography>
          <InvitationDecisionButtons
              disabled={areDecisionButtonsDisabled}
              onAcceptFriendInvitation={handleAcceptInvitation}
              onRejectFriendInvitation={handleRejectInvitation}
          />
       </Box>
   );
};

export default FriendInvitation;
