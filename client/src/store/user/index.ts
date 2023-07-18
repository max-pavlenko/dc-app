import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "@/store/user/actions/thunks/login";
import {register} from "@/store/user/actions/thunks/register";
import {handleLogout} from "@/api/axios";
import {UserResponse} from "@/store/user/types";

export type AuthState = {
   user: UserResponse | null,
   isLoading: boolean,
}

const initialState: AuthState = {
   user: null,
   isLoading: false,
}

const authSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      SET_USER: (state, action: PayloadAction<{ user: AuthState['user'] }>) => {
         state.user = action.payload.user
      },
      LOG_OUT: (state) => {
         state.user = null
         handleLogout().then();
      },
   },
   extraReducers: (builder) => {
      builder
          .addCase(login.fulfilled, (state, action) => {
             state.isLoading = false;
             state.user = action.payload.user;
          })
          .addCase(login.pending, (state) => {
             state.isLoading = true;
          })
          .addCase(login.rejected, (state) => {
             state.isLoading = false;
          })

          .addCase(register.fulfilled, (state, action) => {
             state.isLoading = false;
             state.user = action.payload.user;
          })
          .addCase(register.pending, (state) => {
             state.isLoading = true;
          })
          .addCase(register.rejected, (state) => {
             state.isLoading = false;
          });
   },
})

export default authSlice.reducer;
export const authActions = authSlice.actions;
