import Conversation from "../../schemas/conversation";
import {getSocketIdByUserId} from "../../store/store";
import {getIO} from "../Io";
import {SocketEvent} from '../models/socket.model';

export async function updateChatHistory({conversationId, isInitial = false, toSpecifiedSocketId}: {
   conversationId: string,
   isInitial?: boolean,
   toSpecifiedSocketId?: string
}) {
   const conversation = await findConversationByID(conversationId);

   if (!conversation) return;

   getIO().to(toSpecifiedSocketId || conversation.participants.map(userId => getSocketIdByUserId(userId.toString())!))
       .emit(SocketEvent.GetDirectChatHistory, {
          messages: conversation.messages,
          participants: conversation.participants,
          isInitial
       });
}

async function findConversationByID(id: string) {
   return Conversation.findById(id).populate({
      path: "messages",
      model: "Message",
      populate: {
         path: "author",
         model: "User",
         select: "username _id",
      },
   });
}
