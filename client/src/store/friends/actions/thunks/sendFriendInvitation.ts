import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from '@/api/axios';
import {formatApiError} from '@/shared/utils/error';
import {getTranslation} from '@/i18n/routing';


export const sendFriendInvitation = createAsyncThunk('friends/invitation', async (data: { friendEmail: string }, {rejectWithValue}) => {
   try {
      const response = await apiClient.post('/friend-invitation/invite', data);
      const t = await getTranslation('Notification.Success');
      
      return {notification: t('friendAdded'), ...response.data};
   } catch (error) {
      return rejectWithValue({ error: formatApiError(error) });
   }
});
