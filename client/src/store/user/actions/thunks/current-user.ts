import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "@/api/axios";
import {UserResponse} from "@/store/user/types";
import {formatApiError} from '@/shared/utils/error';

export const getCurrentUser = createAsyncThunk('auth/currentUser', async (_, thunkAPI) => {
   try {
      const user = await apiClient.get<UserResponse>("/auth/current-user");
      
      return user.data;
   } catch (error) {
      return thunkAPI.rejectWithValue({ error: formatApiError(error) });
   }
});
