import {CustomSocket} from "../../middleware/auth";
import Conversation from "../../schemas/conversation";
import {updateChatHistory} from "../events/chat-history";

export async function updateDirectChatHistory({socket, friendID}: { socket: CustomSocket, friendID: string }) {
    try {
        if(!socket.user) return;
        const {user: {userID}, id} = socket;
        const conversation = await Conversation.findOne({
            type: 'DIRECT',
            participants: {$all: [userID, friendID]},
        });

        if (!conversation) throw Error('No conversation found');
        await updateChatHistory({conversationId: conversation._id.toString(), isInitial: true, toSpecifiedSocketId: id})

    } catch (e: any) {
        console.log(e, 'e');
    }
}
