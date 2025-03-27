import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "@/api/axios";

import {UserResponse} from "@/store/user/types";
import {RegisterForm} from '@/shared/types/auth';
import {formatApiError} from '@/shared/utils/error';
import {getTranslation} from '@/i18n/routing';

export const register = createAsyncThunk('auth/register', async (data: RegisterForm, thunkAPI) => {
    try {
        const user = await apiClient.post<{ user: UserResponse }>("/auth/register", data);
        const t = await getTranslation('Notification.Success');

        return {notification: t('register'), ...user.data};
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: formatApiError(error) });
    }
});
