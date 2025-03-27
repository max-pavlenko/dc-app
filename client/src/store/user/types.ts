export type User = {
   username: string,
   email: string,
   authProvider: string
}
export type UserResponse = User & {
   userID: string;
   googleId?: string;
   avatar?: string;
}
