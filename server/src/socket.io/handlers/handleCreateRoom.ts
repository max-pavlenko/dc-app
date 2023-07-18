import {CustomSocket} from "../../middleware/auth";
import {ActiveRooms, getActiveRoomsInstance} from "../Rooms";
import {updateRooms} from "../events/Rooms";

export function handleCreateRoom({socket}: { socket: CustomSocket }) {
   const {id, user} = socket;
   const roomDetails = ActiveRooms.getInstance().addActiveRoom({userID: user!.userID, socketID: id});

   socket.emit('createdNewRoom', {roomDetails});
   updateRooms();
}
