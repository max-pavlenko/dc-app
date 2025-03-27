import {getSocketIdByUserId} from "../../store/store";
import {getIO, SocketIo} from "../Io";
import User from "../../schemas/user";
import {SocketEvent} from '../models/socket.model';

export const updateFriends = async ({userID}: { userID: string }) => {
    try {
        const user = await User.findById(userID).populate('friends', '_id username avatar email');
        if (!user) return null;

        const friends = user.friends.map((friend) => {
            const {_id, username, email} = friend as any;
            return {userID: _id.toString(), username, email};
        });

        getIO().to(getSocketIdByUserId(userID)!).emit(SocketEvent.UpdateFriends, {friends});

    } catch (e) {
        console.log(e)
    }
}
