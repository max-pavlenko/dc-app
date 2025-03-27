import {CustomSocket} from "../../middleware/auth";
import {getIO} from "../Io";
import { SocketEvent } from "../models/socket.model";

export function initRoomConnection({currentlyConnectingUserSocketID, socket}: {socket: CustomSocket, currentlyConnectingUserSocketID: string}) {
   const initializationData = {currentlyConnectingUserSocketID: socket.id};

   getIO().to(currentlyConnectingUserSocketID).emit(SocketEvent.RTCInitResponse, initializationData);
}
