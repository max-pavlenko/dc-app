import { apiClient } from "@/api/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import {formatApiError} from '@/shared/utils/error';

interface ResetPasswordPayload {
   token: string
   password: string
}

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (data: ResetPasswordPayload, { rejectWithValue }) => {
       try {
          const response = await apiClient.post("/auth/reset-password", data)
          
          return response.data
       } catch (error: any) {
          return rejectWithValue({ error: formatApiError(error) })
       }
    },
)

