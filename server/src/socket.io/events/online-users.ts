import {connectedUsers} from "../../store/store";
import {getIO, SocketIo} from "../Io";
import {SocketEvent} from '../models/socket.model';

export const updateOnlineUsers = async () => {
    try {
        const connectedUsersMap: Record<string, any> = {};
        [...connectedUsers].forEach(([socketID, {user}]) => {
            connectedUsersMap[user.userID] = user;
        });

        getIO().emit(SocketEvent.UpdateOnlineUsers, {
            users: connectedUsersMap,
        });
    } catch (e) {
        console.log(e)
    }
}
