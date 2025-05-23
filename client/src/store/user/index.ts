import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login} from '@/store/user/actions/thunks/login';
import {register} from '@/store/user/actions/thunks/register';
import {handleLogout} from '@/api/axios';
import {UserResponse} from '@/store/user/types';
import {getCurrentUser} from '@/store/user/actions/thunks/current-user';
import {forgotPassword} from '@/store/user/actions/thunks/forgot-password';
import { resetPassword } from './actions/thunks/reset-password';
import { verifyResetToken } from './actions/thunks/verify-reset-token';

export type AuthState = {
   user: UserResponse | null,
   isLoading: boolean,
}

const initialState: AuthState = {
   user: null,
   isLoading: false,
};

const authSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      SET_USER: (state, action: PayloadAction<AuthState['user']>) => {
         state.user = action.payload;
      },
      LOG_OUT: (state) => {
         handleLogout();
         state.user = null;
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
          })
          
          .addCase(getCurrentUser.fulfilled, (state) => {
             state.isLoading = false;
          });
      
      builder.addCase(forgotPassword.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(forgotPassword.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(forgotPassword.rejected, (state, action) => {
         state.isLoading = false
      })
      
      builder.addCase(resetPassword.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(resetPassword.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(resetPassword.rejected, (state, action) => {
         state.isLoading = false
      })
      
      builder.addCase(verifyResetToken.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(verifyResetToken.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(verifyResetToken.rejected, (state, action) => {
         state.isLoading = false
      })
   },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
