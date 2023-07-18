import {getIO} from "../Io";
import {getSocketIdByUserId} from "../../store/store";
import {CustomSocket} from "../../middleware/auth";
import {debounce} from "../../utils/debounce";

function emitUserTyping({isTyping, friendID, username}: { isTyping: boolean, friendID: string, username: string }) {
   getIO().to(getSocketIdByUserId(friendID)!).emit('getUserTypingMessage', {username, isTyping});
}

const resetUserTypingMessage = debounce(({friendID, username}: { friendID: string, username: string }) => {
   emitUserTyping({isTyping: false, friendID, username});
}, 1200)

const emitUserTypingMessage = debounce(({friendID, username}: { friendID: string, username: string }) => {
   emitUserTyping({isTyping: true, friendID, username});
}, 100)

export function handleUpdateTypingIndicator({friendID, socket}: { friendID: string, socket: CustomSocket }) {
   const {username} = socket.user!;

   emitUserTypingMessage({friendID, username});
   resetUserTypingMessage({friendID, username});
}
