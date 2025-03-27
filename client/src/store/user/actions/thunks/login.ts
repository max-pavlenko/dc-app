import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginForm} from "@/shared/types/auth";
import {apiClient} from "@/api/axios";
import {UserResponse} from "@/store/user/types";
import {formatApiError} from '@/shared/utils/error';
import {getTranslation} from '@/i18n/routing';

export const login = createAsyncThunk('auth/login', async (requestData: LoginForm, thunkAPI) => {
    try {
        const user = await apiClient.post<{ user: UserResponse }>("/auth/login", requestData);
        const t = await getTranslation('Notification.Success');
        return {notification: t('login'), ...user.data};
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: formatApiError(error) });
    }
});

