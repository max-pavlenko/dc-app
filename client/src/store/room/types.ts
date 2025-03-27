export type UserData = {
   userID: string,
   socketID: string,
   username: string,
}
export type NullableMediaStream = MediaStream | null;
export type RoomDetails = { roomCreator: UserData, participants: UserData[], roomID: string, }
