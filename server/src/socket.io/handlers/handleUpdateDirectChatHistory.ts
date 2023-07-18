import {CustomSocket} from "../../middleware/auth";
import Conversation from "../../schemas/Conversation";
import {updateChatHistory} from "../events/chatHistory";

export async function handleUpdateDirectChatHistory({socket, friendID}: { socket: CustomSocket, friendID: string }) {
    try {
        if(!socket.user) return;
        const {user: {userID}, id} = socket;
        const conversation = await Conversation.findOne({
            type: 'DIRECT',
            participants: {$all: [userID, friendID]},
        });

        if(!conversation) return console.log('No conversation found');
        await updateChatHistory({conversationId: conversation._id.toString(), isInitial: true, toSpecifiedSocketId: id})

    } catch (e: any) {

    }
}
