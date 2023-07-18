import {User} from "@/store/user/types";

export type UserWithID = User & { userID: string };
export type FriendInvitation = {
   id: string,
   receiverID: string,
   sender: {
      _id: string
   } & User,
}
export type Friend = UserWithID;
