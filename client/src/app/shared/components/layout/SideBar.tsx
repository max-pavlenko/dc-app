import React, {FC} from 'react'
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import {useActions, useAppSelector} from "@/store/store";
import SidebarButton from "@/app/shared/ui/SidebarButton";
import ActiveRoomButton from "@/app/features/videoRooms/components/buttons/ActiveRoomButton";
import {CHAT_TYPES} from "@/store/chat/types";

type Props = {};

const SideBar: FC<Props> = ({}) => {
   const {SET_CHAT_DETAILS, CREATE_ROOM} = useActions();
   const {activeRooms, user: {isInRoom}} = useAppSelector(state => state.room)

   function handleGroupsClicked() {
      SET_CHAT_DETAILS({
         type: CHAT_TYPES.NONE,
         friend: null,
      });
   }

   function handleNewRoomClicked() {
      CREATE_ROOM({
         isRoomCreator: true,
         isInRoom: true,
      });
   }
   
   return (
       <div className='w-[72px] px-3 py-2 flex gap-2 flex-col items-center bg-[#202225]'>
          <SidebarButton onClick={handleGroupsClicked}>
             <GroupsIcon/>
          </SidebarButton>
          <SidebarButton disabled={isInRoom} onClick={handleNewRoomClicked}>
             <AddIcon/>
          </SidebarButton>
          {activeRooms.map(room => (
              <ActiveRoomButton key={room.roomID} room={room}/>
          ))}
       </div>
   );
};

export default SideBar;
