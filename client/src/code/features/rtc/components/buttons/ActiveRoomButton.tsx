'use client';

import {FC} from 'react'
import {Tooltip} from "@mui/material";
import {Room} from "@/api/socket.io/handlers";
import SidebarButton from "@/shared/ui/SidebarButton";
import {useActions, useAppSelector} from '@/store/store';
import { useTranslations } from 'next-intl';

type Props = {
   room: Room,
};

const ActiveRoomButton: FC<Props> = ({room: {roomID, participants, roomCreator}}) => {
   const {userID: currentUserID} = useAppSelector(state => state.auth.user!);
   const isCurrentUserInRoom = participants.some(({userID}) => userID === currentUserID);
   const isButtonDisabled = participants.length >= 4 || isCurrentUserInRoom;
   const t = useTranslations();
   const {JOIN_ROOM} = useActions();

   const handleJoinActiveRoomClick = () => {
      JOIN_ROOM({roomID});
   };

   return (
       <Tooltip title={t('Pages.Dashboard.roomInfo', {
            creator: roomCreator.username,
            participants: participants.length,
       })}>
          <div>
             <SidebarButton onClick={handleJoinActiveRoomClick} disabled={isButtonDisabled}>
                {roomCreator.username.slice(0, 2)}
             </SidebarButton>
          </div>
       </Tooltip>
   );
};

export default ActiveRoomButton;
