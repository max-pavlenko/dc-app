import {CustomSocket} from "../../middleware/auth";
import {getIO} from "../Io";

export function handleInitializeRoomConnection({currentlyConnectingUserSocketID, socket}: {socket: CustomSocket, currentlyConnectingUserSocketID: string}) {
   const initializationData = {currentlyConnectingUserSocketID: socket.id};

   getIO().to(currentlyConnectingUserSocketID).emit('getRTCInitResponse', initializationData);
}
