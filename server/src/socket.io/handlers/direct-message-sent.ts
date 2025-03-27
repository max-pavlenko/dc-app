import {CustomSocket} from "../../middleware/auth";
import Message from "../../schemas/message";
import Conversation from "../../schemas/conversation";
import {updateChatHistory} from "../events/chat-history";
import {NewMessage} from "../../socket-server";

export async function onDirectMessageSent({socket, message: {receiverID, content}}: { socket: CustomSocket, message: NewMessage }) {
    try {
        const {userID} = socket.user!;

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
