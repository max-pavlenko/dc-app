import FriendInvitation from "../../schemas/FriendInvitation";
import {getSocketIdByUserId} from "../../store/store";
import {getIO} from "../Io";

export const updateFriendInvitation = async ({userID}: { userID: string }) => {
    try {
        const pendingInvitations = await FriendInvitation.find({receiverID: userID}).populate('senderID', '_id username email');

        getIO().to(getSocketIdByUserId(userID)!).emit('updateFriendInvitations', {
            friendInvitations: pendingInvitations?.map(({_id, receiverID, senderID}) => ({
                id: _id, sender: senderID, receiverID
            })) ?? []
        });
    } catch (e) {
        console.log(e)
    }
}
