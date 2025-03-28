import {CustomSocket} from "../../middleware/auth";
import {getActiveRoomsInstance, UserData} from "../Rooms";
import {updateRooms} from "../events/rooms";
import {getIO} from "../Io";
import {SocketEvent} from '../models/socket.model';

export function joinRoom({roomID, socket}: { roomID: number, socket: CustomSocket }) {
   const RoomsInstance = getActiveRoomsInstance();
   const activeRoom = RoomsInstance.getActiveRoom(roomID);
   const participantInfo: UserData = {
      userID: socket.user?.userID!,
      socketID: socket.id,
   };
   RoomsInstance.joinActiveRoom({roomID, newParticipant: participantInfo});

   activeRoom!.participants.reduce<string[]>((prev, {socketID}) => socketID !== participantInfo.socketID ? [...prev, socketID] : prev, [])
       .forEach(socketID => {
          console.log('prepareRTC', socketID)
          getIO().to(socketID).emit(SocketEvent.PrepareRTC, {
             currentlyConnectingUserSocketID: participantInfo.socketID,
          })
       });

   updateRooms();
}
