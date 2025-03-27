import {UserResponse} from '@/store/user/types';

export type FriendInvitation = {
   id: string,
   receiverID: string,
   sender: {
      _id: string
   } & UserResponse,
}
export type Friend = UserResponse;
