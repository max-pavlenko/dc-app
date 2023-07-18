import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Friend, FriendInvitation} from "@/store/friends/types";

export type FriendsState = {
    friends: Friend[],
    friendInvitations: FriendInvitation[],
    onlineUsers: Record<string, Friend>
}

const initialState: FriendsState = {
    friends: [],
    friendInvitations: [],
    onlineUsers: {},
}

const friendsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_FRIENDS: (state, action: PayloadAction<Friend[]>) => {
            state.friends = action.payload
        },
        SET_FRIEND_INVITATIONS: (state, action: PayloadAction<FriendInvitation[]>) => {
            state.friendInvitations = action.payload
        },
        APPEND_PENDING_FRIEND_INVITATIONS: (state, action: PayloadAction<FriendInvitation[]>) => {
            state.friendInvitations.push(...action.payload)
        },
        SET_ONLINE_USERS: (state, action: PayloadAction<Record<string, Friend>>) => {
            state.onlineUsers = action.payload;
        },
    },

})

export default friendsSlice.reducer;
export const friendsActions = friendsSlice.actions;
