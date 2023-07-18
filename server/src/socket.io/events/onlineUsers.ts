import {connectedUsers} from "../../store/store";
import {getIO, SocketIo} from "../Io";

export const updateOnlineUsers = async () => {
    try {
        const connectedUsersMap: Record<string, any> = {};
        [...connectedUsers].forEach(([socketID, user]) => {
            connectedUsersMap[user.user.userID] = user.user;
        });

        getIO().emit('updateOnlineUsers', {
            users: connectedUsersMap,
        });
    } catch (e) {
        console.log(e)
    }
}
