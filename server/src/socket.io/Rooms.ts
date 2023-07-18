import {connectedUsers} from "../store/store";

export type UserData = {
   userID: string,
   socketID: string,
}

export type Room = {
   roomCreator: UserData & {username: string},
   participants: UserData[],
   roomID: number,
}

export class ActiveRooms {
   private readonly rooms: Room[] = [];
   private static instance: ActiveRooms;

   private constructor(rooms: Room[] = []) {
      this.rooms = rooms;
   }

   public static getInstance() {
      if (!ActiveRooms.instance) {
         ActiveRooms.instance = new ActiveRooms();
      }
      return ActiveRooms.instance;
   }

   public getRooms() {
      return this.rooms;
   }

   public getActiveRoom(roomID: Room['roomID']) {
      return this.rooms.find(room => room.roomID === roomID);
   }

   public joinActiveRoom({roomID, newParticipant}: { roomID: number, newParticipant: UserData }) {
      const activeRoomIndex = this.rooms.findIndex(room => room.roomID === roomID);
      const activeRoom = this.rooms[activeRoomIndex];

      const updatedRoom = {
         ...activeRoom,
         participants: [...activeRoom!.participants, newParticipant],
      } as Room;
      this.rooms[activeRoomIndex] = updatedRoom;

      console.log(this.rooms);
      return updatedRoom;
   }

   public leaveActiveRoom({roomID, currentUserSocketID}: { roomID: Room['roomID'], currentUserSocketID: string }) {
      const activeRoomIndex = this.rooms.findIndex(room => room.roomID === roomID);
      const activeRoom = this.rooms[activeRoomIndex];
      if (!activeRoom) return;
      activeRoom.participants = activeRoom.participants.filter(({socketID}) => socketID !== currentUserSocketID);
      this.rooms[activeRoomIndex] = activeRoom;
      if(activeRoom.participants.length === 0) this.rooms.splice(activeRoomIndex, 1);

      return activeRoom;
   }

   public addActiveRoom({userID, socketID}: { userID: string, socketID: string }) {
      const newActiveRoom = {
         roomCreator: {
            userID,
            socketID,
            username: connectedUsers.get(socketID)?.user.username!,
         },
         participants: [
            {
               userID,
               socketID,
            },
         ],
         roomID: this.rooms.length + 1,
      };
      this.rooms.push(newActiveRoom);

      return newActiveRoom;
   }
}

export function getActiveRoomsInstance() {
   return ActiveRooms.getInstance();
}
