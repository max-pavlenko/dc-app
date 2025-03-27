'use client';

import {FC} from 'react'
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useActions} from "@/store/store";

type Props = {};

const CloseRoomButton: FC<Props> = ({}) => {
   const {LEAVE_ROOM} = useActions();

   const handleLeaveRoom = () => {
      LEAVE_ROOM();
   };

   return (
       <IconButton onClick={handleLeaveRoom}>
          <CloseIcon />
       </IconButton>
   );
};

export default CloseRoomButton;
