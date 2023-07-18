import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "@/api/axios";
import {AxiosError} from "axios";
import {RegisterFormValues} from "@/types/Register";
import {formatErrorMessage} from "@/utils/formatErrorMessage";
import {ErrorResponse} from "@/types/Axios";

import {UserResponse} from "@/store/user/types";

export const register = createAsyncThunk('auth/register', async (data: RegisterFormValues, thunkAPI) => {
    try {
        const user = await apiClient.post<{ user: UserResponse }>("/auth/register", data);
        console.log('user.data', user.data)

        return {notificationMessage: 'signed up', ...user.data};
    } catch (error: any) {
        const { response } = error as AxiosError<ErrorResponse>;
        const message = (response?.data || 'Check you Internet connection and try again') as string;
        const status = response?.status;

        return thunkAPI.rejectWithValue({ message, status, notificationMessage: formatErrorMessage(message) });
    }
});
