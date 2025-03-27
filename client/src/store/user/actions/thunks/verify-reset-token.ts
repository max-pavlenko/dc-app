import { apiClient } from "@/api/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import {formatApiError} from '@/shared/utils/error';

interface VerifyResetTokenPayload {
   token: string
}

export const verifyResetToken = createAsyncThunk(
    "user/verifyResetToken",
    async (data: VerifyResetTokenPayload, { rejectWithValue }) => {
       try {
          const response = await apiClient.post("/auth/verify-reset-token", data)
          
          return response.data
       } catch (error: any) {
          return rejectWithValue({ error: formatApiError(error) })
       }
    },
)

