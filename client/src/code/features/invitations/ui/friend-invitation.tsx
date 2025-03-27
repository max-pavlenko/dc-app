'use client';

import {FC, useState} from 'react'
import {Avatar, Box, Typography} from "@mui/material";
import InvitationDecision from "@/code/features/invitations/ui/invitation-decision";
import {useAcceptFriendInvitationMutation, useRejectFriendInvitationMutation} from '@/code/features/invitations/services/invitations.service';
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
       <div className='w-full mt-2.5 gap-1.5 grid justify-items-center border-2 p-2 rounded-md border-[rgb(var(--violet-rgb))]'>
          <div className='flex items-center gap-2'>
             <Avatar sx={{width: '28px', height: '28px'}} alt={username}/>
             <Typography className="font-bold text-[#8e9297] flex-1" variant="subtitle1">
                {username}
             </Typography>
          </div>
          <InvitationDecision
              disabled={areDecisionButtonsDisabled}
              onAcceptFriendInvitation={handleAcceptInvitation}
              onRejectFriendInvitation={handleRejectInvitation}
          />
       </div>
   );
};

export default FriendInvitation;
