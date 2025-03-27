import {getIO} from "../Io";
import {getActiveRoomsInstance} from "../Rooms";
import {SocketEvent} from '../models/socket.model';

export function updateRooms(socketID?: string | string[]) {
   const io = getIO();

   const activeRooms = getActiveRoomsInstance().getRooms();
   const eventTarget = socketID ? io.to(socketID) : io;

   eventTarget.emit(SocketEvent.UpdateActiveRooms, {activeRooms});
}
