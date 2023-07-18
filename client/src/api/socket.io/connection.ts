import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {AppMiddlewareAPI} from "@/store/store";
import {getSocketHandlers} from "@/api/socket.io/handlers";
import {SocketEvents} from "@/api/socket.io/types";
import {roomSlice} from "@/store/room";

export type IoSocket = Socket<DefaultEventsMap, DefaultEventsMap>;
let socket: IoSocket = null!;
let storeState: AppMiddlewareAPI = null!;

export const connectSocketServer = ({jwtToken, state}: { jwtToken: string, state: AppMiddlewareAPI }) => {
   const socketHandlers = getSocketHandlers(state);
   socket = io('localhost:5000', {
      auth: {token: jwtToken,}
   });
   storeState = state;

   socket.on('connect', () => {
      console.log('connected with socket.io', socket)
   });

   Object.entries(socketHandlers).forEach(([propName, handler]) => {
      socket.on(propName, handler(socket))
   });

   return socket;
}


export function sendDirectMessage(data: { receiverID: string, content: string }) {
   socket.emit(SocketEvents.sendNewDirectMessage, data);
}

export function initialUpdateDirectChatHistory(data: { friendID: string }) {
   socket.emit(SocketEvents.updateDirectChatHistory, data);
}

export function emitUserTypingMessage(data: { friendID: string }) {
   socket.emit(SocketEvents.userTypingMessage, data);
}

export function leaveRoom(roomID: string) {
   socket.emit(SocketEvents.leaveRoom, {roomID});
}

export function createNewRoom() {
   socket.emit(SocketEvents.createRoom);
}

export function joinRoom(roomData: { roomID: string }) {
   const {dispatch} = storeState;

   dispatch({
      type: roomSlice.actions.JOIN_ROOM.type,
      payload: {
         roomID: roomData.roomID
      }
   });
   socket.emit(SocketEvents.joinRoom, roomData);
}

export function signalPeerData<T extends {}>(signalData: T) {
   socket.emit(SocketEvents.RTCSignal, signalData);
}
