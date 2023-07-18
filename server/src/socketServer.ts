import {Server} from 'socket.io';
import {CustomSocket, verifyTokenWebsocket} from "./middleware/auth";
import handleNewSocketConnection from "./socket.io/handlers/handleNewSocketConnection";
import handleSocketDisconnect from "./socket.io/handlers/handleSocketDisconnect";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {SocketIo} from "./socket.io/Io";
import {handleNewDirectMessage} from "./socket.io/handlers/handleNewDirectMessage";
import http from "http";
import {handleUpdateDirectChatHistory} from "./socket.io/handlers/handleUpdateDirectChatHistory";
import {handleUpdateTypingIndicator} from "./socket.io/handlers/handleUpdateTypingIndicator";
import {handleCreateRoom} from "./socket.io/handlers/handleCreateRoom";
import {handleJoinRoom} from "./socket.io/handlers/handleJoinRoom";
import {handleLeaveRoom} from "./socket.io/handlers/handleLeaveRoom";
import {handleInitializeRoomConnection} from "./socket.io/handlers/handleInitializeRoomConnection";
import {handleRoomRTCSignal} from "./socket.io/handlers/handleRoomRTCSignal";

export type IO = Server<DefaultEventsMap, DefaultEventsMap>;
export type NewMessage = {content: string, receiverID: string};
export type SocketObject = {socket: CustomSocket};

const SOCKET_EVENT_HANDLERS_MAP = {
    disconnect: (obj: SocketObject) => handleSocketDisconnect(obj),

    sendNewDirectMessage: (obj: Parameters<typeof handleNewDirectMessage>[number]) => handleNewDirectMessage(obj),
    updateDirectChatHistory: (obj: Parameters<typeof handleUpdateDirectChatHistory>[number]) => handleUpdateDirectChatHistory(obj),
    userTypingMessage: (obj: Parameters<typeof handleUpdateTypingIndicator>[number]) => handleUpdateTypingIndicator(obj),

    createRoom: (obj: SocketObject) => handleCreateRoom(obj),
    joinRoom: (obj: Parameters<typeof handleJoinRoom>[number]) => handleJoinRoom(obj),
    leaveRoom: (obj: Parameters<typeof handleLeaveRoom>[number]) => handleLeaveRoom(obj),

    initRTC: (obj: Parameters<typeof handleInitializeRoomConnection>[number]) => handleInitializeRoomConnection(obj),
    RTCSignal: (obj: Parameters<typeof handleRoomRTCSignal>[number]) => handleRoomRTCSignal(obj),
} satisfies Record<string, (...args: any[]) => void>;

const createSocketServer = <T extends http.Server>(server: T) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
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
