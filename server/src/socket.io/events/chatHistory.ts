import Conversation from "../../schemas/Conversation";
import {getSocketIdByUserId} from "../../store/store";
import {getIO} from "../Io";

export async function updateChatHistory({conversationId, isInitial = false, toSpecifiedSocketId}: {
   conversationId: string,
   isInitial?: boolean,
   toSpecifiedSocketId?: string
}) {
   const conversation = await findConversationByID(conversationId);

   if (!conversation) return;

   getIO().to(toSpecifiedSocketId || conversation.participants.map(userId => getSocketIdByUserId(userId.toString())!))
       .emit("getDirectChatHistory", {
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
