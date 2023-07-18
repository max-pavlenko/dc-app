import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Friend} from "@/store/friends/types";
import {CHAT_TYPES, Message} from "@/store/chat/types";

export type ChatState = {
    messages: Message[],
    chat: {
        type: CHAT_TYPES,
        friend: Friend | null,
        currentlyTypingData: {
            isTyping: boolean,
            username: string,
        }
    }
}

const initialState: ChatState = {
    messages: [],
    chat: {
        friend: null,
        type: CHAT_TYPES.NONE,
        currentlyTypingData: {
            isTyping: false,
            username: '',
        }
    }
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        SET_CHAT_DETAILS: (state, action: PayloadAction<Partial<ChatState['chat']>>) => {
            state.chat = {...state.chat, ...action.payload};
        },
        SET_MESSAGES: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },

        SET_CURRENTLY_TYPING_DATA: (state, action: PayloadAction<ChatState['chat']['currentlyTypingData']>) => {
            state.chat.currentlyTypingData = action.payload;
        },
    }
})

export default chatSlice.reducer;
export const chatActions = chatSlice.actions;
