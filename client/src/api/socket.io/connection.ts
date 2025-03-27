import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {AppMiddlewareAPI} from "@/store/store";
import {getSocketHandlers} from "@/api/socket.io/handlers";
import {roomSlice} from "@/store/room";
import { SocketEvent } from "@/shared/models/socket.model";

export type IoSocket = Socket<DefaultEventsMap, DefaultEventsMap>;
let socket: IoSocket = null!;

export const connectSocketServer = ({jwtToken, state}: { jwtToken: string, state: AppMiddlewareAPI }) => {
   const socketHandlers = getSocketHandlers(state);
   socket ??= io('localhost:5000', {
      auth: {token: jwtToken,}
   });

   socket.on('connect', () => {
      console.log('connected with socket.io', socket)
   });

   Object.entries(socketHandlers).forEach(([propName, handler]) => {
      socket.on(propName, handler(socket))
   });

   return socket;
}


export function sendDirectMessage(data: {message: { receiverID: string, content: string }}) {
   socket.emit(SocketEvent.SendNewDirectMessage, data);
}

export function initialUpdateDirectChatHistory(data: { friendID: string }) {
   socket.emit(SocketEvent.UpdateDirectChatHistory, data);
}

export function emitUserTypingMessage(data: { friendID: string }) {
   socket.emit(SocketEvent.UserTyping, data);
}

export function leaveRoom(roomID: string) {
   socket.emit(SocketEvent.LeaveRoom, {roomID});
}

export function createNewRoom() {
   socket.emit(SocketEvent.CreateRoom);
}

export function joinRoom(roomData: { roomID: string }) {
   socket.emit(SocketEvent.JoinRoom, roomData);
}

export function signalPeerData<T extends {}>(signalData: T) {
   socket.emit(SocketEvent.RTCSignal, signalData);
}
