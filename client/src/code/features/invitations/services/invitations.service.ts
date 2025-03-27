import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {NotificationMessage} from '@/shared/types/notification';
import {getCookie} from 'cookies-next';
import {CookieKey} from '@/shared/models/cookie.model';
import { getTranslation } from '@/i18n/routing';

type TransformedSentInvitationResponse = { email: string } & NotificationMessage;

export const invitationsApi = createApi({
   reducerPath: 'invitations',
   baseQuery: fetchBaseQuery({
      baseUrl: `http://localhost:5000/api/friend-invitation`,
      prepareHeaders: async (headers) => {
         const token = await getCookie(CookieKey.Token);
         if (token) {
            headers.set('Authorization', `Bearer ${token}`);
         }
         return headers;
      }
   }),
   
   endpoints: (builder) => ({
      sendFriendInvitation: builder.mutation<TransformedSentInvitationResponse, { friendEmail: string }>({
         query: (data) => ({
            url: '/invite',
            method: 'POST',
            body: data,
         }),
      }),
      
      acceptFriendInvitation: builder.mutation<TransformedSentInvitationResponse, { inviteID: string }>({
         query: (data) => ({
            url: '/accept',
            method: 'POST',
            body: data,
         }),
      }),
      rejectFriendInvitation: builder.mutation<TransformedSentInvitationResponse, { inviteID: string }>({
         query: (data) => ({
            url: '/reject',
            method: 'POST',
            body: data,
         }),
      }),
   }),
});

export const {
   useSendFriendInvitationMutation,
   useAcceptFriendInvitationMutation,
   useRejectFriendInvitationMutation,
   
} = invitationsApi;
