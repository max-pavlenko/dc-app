import {FC} from 'react'
import {Tooltip} from "@mui/material";
import {Room} from "@/api/socket.io/handlers";
import SidebarButton from "@/app/shared/ui/SidebarButton";
import {joinRoom} from "@/api/socket.io/connection";
import {useAppSelector} from "@/store/store";

type Props = {
   room: Room,
};

const ActiveRoomButton: FC<Props> = ({room: {roomID, participants, roomCreator}}) => {
   const {userID: currentUserID} = useAppSelector(state => state.auth.user!);
   const isCurrentUserInRoom = participants.some(({userID}) => userID === currentUserID);
   const isButtonDisabled = participants.length >= 4 || isCurrentUserInRoom;
   const title = `Creator: ${roomCreator.username}. Connected: ${participants.length}`

   const handleJoinActiveRoomClick = () => {
      joinRoom({roomID});
   };

   return (
       <Tooltip title={title}>
          <div>
             <SidebarButton onClick={handleJoinActiveRoomClick} disabled={isButtonDisabled}>
                {roomCreator.username.slice(0, 2)}
             </SidebarButton>
          </div>
       </Tooltip>
   );
};

export default ActiveRoomButton;
