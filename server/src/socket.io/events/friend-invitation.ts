import FriendInvitation from "../../schemas/friend-invitation";
import {getSocketIdByUserId} from "../../store/store";
import {getIO} from "../Io";
import {SocketEvent} from '../models/socket.model';

export const updateFriendInvitation = async ({userID}: { userID: string }) => {
    try {
        const pendingInvitations = await FriendInvitation.find({receiverID: userID}).populate('senderID', '_id avatar username email');

        getIO().to(getSocketIdByUserId(userID)!).emit(SocketEvent.UpdateFriendInvitations, {
            friendInvitations: pendingInvitations?.map(({_id, receiverID, senderID}) => ({
                id: _id, sender: senderID, receiverID
            })) ?? []
        });
    } catch (e) {
        console.log(e)
    }
}
