import {CustomSocket} from "../../middleware/auth";
import {ActiveRooms, getActiveRoomsInstance} from "../Rooms";
import {updateRooms} from "../events/rooms";
import {SocketEvent} from '../models/socket.model';
import {getIO} from '../Io';

export function onRoomCreated({socket}: { socket: CustomSocket }) {
   const {id, user} = socket;
   const io = getIO()
   console.log(user?.friends, 'user');
   const roomDetails = ActiveRooms.getInstance().addActiveRoom({userID: user!.userID, socketID: id});

   socket.emit(SocketEvent.CreateRoom, {roomDetails});
   updateRooms();
   user?.friends && io
       .to(user?.friends)
       .emit(SocketEvent.NotifyFriendRoomCreated, {user});
}
