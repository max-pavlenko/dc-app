import {Server} from 'socket.io';
import {CustomSocket, verifyTokenWebsocket} from "./middleware/auth";
import handleNewSocketConnection from "./socket.io/handlers/new-socket-connection";
import handleSocketDisconnect from "./socket.io/handlers/disconnect-socket";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {SocketIo} from "./socket.io/Io";
import {onDirectMessageSent} from "./socket.io/handlers/direct-message-sent";
import http from "http";
import {updateDirectChatHistory} from "./socket.io/handlers/update-direct-chat-history";
import {updateIsTyping} from "./socket.io/handlers/update-is-typing";
import {onRoomCreated} from "./socket.io/handlers/create-room";
import {joinRoom} from "./socket.io/handlers/join-room";
import {leaveRoom} from "./socket.io/handlers/leave-room";
import {initRoomConnection} from "./socket.io/handlers/init-room-connection";
import {handleRoomRTCSignal} from "./socket.io/handlers/room-RTC-signal";
import { SocketEvent } from './socket.io/models/socket.model';

export type IO = Server<DefaultEventsMap, DefaultEventsMap>;
export type NewMessage = {content: string, receiverID: string};
export type SocketObject = {socket: CustomSocket};

const SOCKET_EVENT_HANDLERS_MAP = {
    disconnect: (obj: SocketObject) => handleSocketDisconnect(obj),

    [SocketEvent.SendNewDirectMessage]: onDirectMessageSent,
    [SocketEvent.UpdateDirectChatHistory]: updateDirectChatHistory,
    [SocketEvent.UserTyping]: updateIsTyping,

    [SocketEvent.CreateRoom]: onRoomCreated,
    [SocketEvent.JoinRoom]: joinRoom,
    [SocketEvent.LeaveRoom]: leaveRoom,

    [SocketEvent.InitRTC]: initRoomConnection,
    [SocketEvent.RTCSignal]: handleRoomRTCSignal,
} satisfies Partial<Record<'disconnect' | SocketEvent, (...args: any[]) => void>>;

const createSocketServer = <T extends http.Server>(server: T) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }
    });
    SocketIo.getInstance(io);

    io.use((socket, next) => {
        verifyTokenWebsocket(socket, next);
    })

    io.on('connection', (socket) => {
        handleNewSocketConnection({socket}).then();

        Object.entries(SOCKET_EVENT_HANDLERS_MAP).forEach(([eventName, handler]) => {
            socket.on(eventName, (args: any) => handler({...args, socket}))
        })
    });
};

export default createSocketServer;
