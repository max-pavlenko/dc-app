import {CustomSocket} from "../../middleware/auth";
import {getActiveRoomsInstance} from "../Rooms";
import {updateRooms} from "../events/Rooms";
import {getIO} from "../Io";

export function handleLeaveRoom({roomID, socket}: {socket: CustomSocket, roomID: number}) {
    const RoomsInstance = getActiveRoomsInstance();
    const activeRoom = RoomsInstance.getActiveRoom(roomID);

    if(!activeRoom) return;
    const updatedActiveRoom = RoomsInstance.leaveActiveRoom({roomID, currentUserSocketID: socket.id});

    const participantsSocketIDS = updatedActiveRoom?.participants.map(({socketID}) => socketID) || [];
    console.log('participantLeftRoom', socket.id, updatedActiveRoom)
    getIO().to(participantsSocketIDS).emit('participantLeftRoom', {
        leftParticipantSocketID: socket.id
    })

    updateRooms();
}
