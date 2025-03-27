'use client';

import {FC} from 'react'
import {Box, BoxProps, IconButton, IconButtonProps} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
   onRejectFriendInvitation: () => void;
   onAcceptFriendInvitation: () => void;
   disabled: boolean;
} & Omit<BoxProps, 'className'>;

const InvitationDecision: FC<Props> = ({onRejectFriendInvitation, disabled, onAcceptFriendInvitation, ...props}) => {
   return (
       <Box {...props} className={`flex ${disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'opacity-100'}`}>
          <IconButton onClick={onAcceptFriendInvitation}>
             <CheckIcon style={{fontSize: 22}}/>
          </IconButton>
          <IconButton onClick={onRejectFriendInvitation}>
             <ClearIcon style={{fontSize: 22}}/>
          </IconButton>
       </Box>
   );
};

export default InvitationDecision;
