import { createAsyncThunk } from "@reduxjs/toolkit"
import {apiClient} from '@/api/axios';
import {formatApiError} from '@/shared/utils/error';
import {getTranslation} from '@/i18n/routing';

interface ForgotPasswordPayload {
   email: string
}

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (data: ForgotPasswordPayload, { rejectWithValue }) => {
       try {
          const response = await apiClient.post("/auth/forgot-password", data)
          const t = await getTranslation();
          
          return {...response.data, notification: t('Pages.ForgotPassword.emailSentTitle')}
       } catch (error: any) {
          return rejectWithValue({ error: formatApiError(error) })
       }
    },
)

