import {CustomSocket} from "../../middleware/auth";
import Message from "../../schemas/Message";
import Conversation from "../../schemas/Conversation";
import {updateChatHistory} from "../events/chatHistory";
import {NewMessage} from "../../socketServer";

export async function handleNewDirectMessage({socket, message}: { socket: CustomSocket, message: NewMessage }) {
    try {
        const {userID} = socket.user!;
        const {receiverID, content} = message;

        let [newMessage, conversation] = await Promise.all([
            Message.create({
                content,
                type: 'DIRECT',
                date: new Date(),
                author: userID,
            }),
            Conversation.findOne({
                participants: {$all: [userID, receiverID]},
                type: 'DIRECT',
            })
        ])

        if (!conversation) {
            conversation = await Conversation.create({
                messages: [newMessage._id],
                participants: [userID, receiverID],
                type: 'DIRECT',
            });
        }


        conversation.messages.push(newMessage._id);
        await conversation.save();

        await updateChatHistory({conversationId: conversation._id.toString()});
    } catch (e) {
        console.log(e);
    }
}
