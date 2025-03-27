import {CustomSocket} from "../../middleware/auth";
import {getActiveRoomsInstance} from "../Rooms";
import {updateRooms} from "../events/rooms";
import {getIO} from "../Io";
import {SocketEvent} from '../models/socket.model';

export function leaveRoom({roomID, socket}: {socket: CustomSocket, roomID: number}) {
    const RoomsInstance = getActiveRoomsInstance();
    const activeRoom = RoomsInstance.getActiveRoom(roomID);

    if(!activeRoom) return;
    const updatedActiveRoom = RoomsInstance.leaveActiveRoom({roomID, currentUserSocketID: socket.id});

    const participantsSocketIDS = updatedActiveRoom?.participants.map(({socketID}) => socketID) || [];
    getIO().to(participantsSocketIDS).emit(SocketEvent.LeaveRoom, {
        leftParticipantSocketID: socket.id
    })

    updateRooms();
}
