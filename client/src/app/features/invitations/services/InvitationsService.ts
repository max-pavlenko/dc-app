import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ENV_VARS} from "@/utils/envVariables";
import {NotificationMessage} from "@/types/Notifications";
import {formatErrorMessage} from "@/utils/formatErrorMessage";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {RootState} from "@/store/store";

type TransformedSentInvitationResponse = { email: string } & NotificationMessage;
type SentInvitationErrorResponse = FetchBaseQueryError & { data: { error: string } }

export const invitationsApi = createApi({
   reducerPath: 'invitations',
   baseQuery: fetchBaseQuery({
      baseUrl: `http://${ENV_VARS.API_URL}/friend-invitation`,
      prepareHeaders: (headers, {getState}) => {
         const store = getState() as RootState;
         const token = store.auth.user?.token;
         console.log('store', store)
         if (token) {
            headers.set('Authorization', `Bearer ${token}`);
         }
         return headers;
      },
   }),
   endpoints: (builder) => ({
      sendFriendInvitation: builder.mutation<TransformedSentInvitationResponse, { friendEmail: string }>({
         query: (data) => ({
            url: '/invite',
            method: 'POST',
            body: data,
         }),
         transformErrorResponse(fetchBaseQueryError: SentInvitationErrorResponse) {
            const errorText = typeof fetchBaseQueryError.data === 'string' ? fetchBaseQueryError.data : fetchBaseQueryError.data.error;

            return {
               ...fetchBaseQueryError,
               notificationMessage: formatErrorMessage(errorText),
            }
         },
         transformResponse(baseQueryReturnValue: TransformedSentInvitationResponse) {
            return {
               ...baseQueryReturnValue,
               notificationMessage: `sent the invitation to ${baseQueryReturnValue.email}`
            }
         }
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
