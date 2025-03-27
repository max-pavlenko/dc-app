import {CustomSocket} from '../../middleware/auth';
import {removeConnectedUser} from '../../store/store';
import {updateOnlineUsers} from '../events/online-users';
import {leaveRoom} from './leave-room';
import {getActiveRoomsInstance} from '../Rooms';

export default function ({socket}: { socket: CustomSocket }) {
   const activeRooms = getActiveRoomsInstance().getRooms();
   activeRooms.forEach(({participants, roomID}) => {
      const isUserAtRoom = participants.some(participant => participant.socketID === socket.id);
      if (isUserAtRoom) leaveRoom({roomID, socket});
   });
   
   removeConnectedUser({socket});
   
   return updateOnlineUsers();
}
