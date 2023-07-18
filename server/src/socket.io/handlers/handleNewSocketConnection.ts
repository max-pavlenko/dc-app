import {addConnectedUser} from "../../store/store";
import {CustomSocket} from "../../middleware/auth";
import {updateFriendInvitation} from "../events/friendInvitation";
import {updateFriends} from "../events/friends";
import {updateOnlineUsers} from "../events/onlineUsers";
import {updateRooms} from "../events/Rooms";

export default async function ({socket}: { socket: CustomSocket }) {
    const userID = socket.user?.userID!;
    addConnectedUser({
        user: socket.user!,
        socket: socket
    });
    updateRooms(socket.id);

    await Promise.all([
        updateFriendInvitation({userID}),
        updateFriends({userID}),
        updateOnlineUsers(),
    ]);
}
