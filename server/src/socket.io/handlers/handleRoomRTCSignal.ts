import {SignalData} from 'simple-peer';
import {SocketObject} from "../../socketServer";
import {getIO} from "../Io";

export function handleRoomRTCSignal({connectingUserSocketID, signal, socket}: SocketObject & { connectingUserSocketID: string, signal: SignalData }) {
   getIO().to([connectingUserSocketID]).emit('fulfilledRTCSignal', {signal, connectingUserSocketID: socket.id});
}
