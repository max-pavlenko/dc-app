import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginFormValues} from "@/types/Login";
import {apiClient} from "@/api/axios";
import {AxiosError} from "axios";
import {formatErrorMessage} from "@/utils/formatErrorMessage";
import {ErrorResponse} from "@/types/Axios";
import {UserWithToken} from "@/store/middlewares/AuthMiddleware";
import {User, UserResponse} from "@/store/user/types";

export const login = createAsyncThunk('auth/login', async (requestData: LoginFormValues, thunkAPI) => {
    try {
        const user = await apiClient.post<{ user: UserResponse }>("/auth/login", requestData);
        console.log('user.data', user.data)

        return {notificationMessage: 'logged in', ...user.data};
    } catch (error: any) {
        const { response } = error as AxiosError<ErrorResponse>;
        const message = (response?.data.error || 'Check you Internet connection and try again') as string;
        const status = response?.status;

        return thunkAPI.rejectWithValue({ message, status, notificationMessage: formatErrorMessage(message) });
    }
});
