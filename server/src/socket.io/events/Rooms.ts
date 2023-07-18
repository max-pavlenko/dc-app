import {getIO} from "../Io";
import {getActiveRoomsInstance} from "../Rooms";

export function updateRooms(socketID?: string | string[]) {
   const io = getIO();

   const activeRooms = getActiveRoomsInstance().getRooms();
   const targetEmit = socketID ? io.to(socketID) : io;

   targetEmit.emit('updateActiveRooms', {activeRooms});
}
