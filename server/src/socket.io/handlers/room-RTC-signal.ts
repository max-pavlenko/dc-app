import {SignalData} from 'simple-peer';
import {SocketObject} from "../../socket-server";
import {getIO} from "../Io";
import {SocketEvent} from '../models/socket.model';

export function handleRoomRTCSignal({connectingUserSocketID, signal, socket}: SocketObject & { connectingUserSocketID: string, signal: SignalData }) {
   getIO().to([connectingUserSocketID]).emit(SocketEvent.RTCSignalFulfilled, {signal, connectingUserSocketID: socket.id});
}
