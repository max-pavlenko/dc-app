import {CustomSocket} from "../../middleware/auth";
import {removeConnectedUser} from "../../store/store";
import {updateOnlineUsers} from "../events/onlineUsers";
import {handleLeaveRoom} from "./handleLeaveRoom";
import {getActiveRoomsInstance} from "../Rooms";

export default function ({socket}: { socket: CustomSocket }) {
    const activeRooms = getActiveRoomsInstance().getRooms();
    activeRooms.forEach(({participants, roomID}) => {
        const isUserAtRoom = participants.some(participant => participant.socketID === socket.id);
       if(isUserAtRoom) handleLeaveRoom({roomID, socket});
    });

    removeConnectedUser({socket});

    Promise.all([
        updateOnlineUsers(),
    ]).then()
}
