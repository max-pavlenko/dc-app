import {CustomSocket, User} from "../middleware/auth";

export const connectedUsers = new Map<string, { user: User }>();

export const addConnectedUser = ({socket, user}: { socket: CustomSocket, user: User }) => {
    connectedUsers.set(socket.id, {user});
}

export const removeConnectedUser = ({socket}: { socket: CustomSocket }) => {
    connectedUsers.delete(socket?.id)
    console.log('disconnect');
}

export function getSocketIdByUserId(id: string) {
    for (const [key, value] of connectedUsers.entries()) {
        if (value.user.userID === id) {
            return key;
        }
    }
    return null;
}
