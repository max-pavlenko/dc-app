import mong, {Schema} from "mongoose";

const FriendInvitation = new mong.Schema({
    senderID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    receiverID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})

export default mong.model('friendInvitation', FriendInvitation);
