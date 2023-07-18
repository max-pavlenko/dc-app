import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient, checkLogOutResponseCode} from "@/api/axios";
import {AxiosError} from "axios";
import {formatErrorMessage} from "@/utils/formatErrorMessage";


export const sendFriendInvitation = createAsyncThunk('friends/invitation', async (data: { friendEmail: string }, {rejectWithValue}) => {
    try {
        const response = await apiClient.post("/friend-invitation/invite", data);

        return {notificationMessage: 'sent the invitation', ...response.data};
    } catch (error: any) {
        const err = error as AxiosError;
        // checkResponseCode(err.response?.status!);
        const message = (err.response?.data || 'Check you Internet connection and try again') as string;
        const status = err.response?.status;

        return rejectWithValue({ message, status, notificationMessage: formatErrorMessage(message) });
    }
});
