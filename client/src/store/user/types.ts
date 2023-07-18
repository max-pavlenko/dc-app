export type User = {
   username: string,
   email: string,
}
export type UserResponse = User & {
   token: string;
   userID: string;
}
