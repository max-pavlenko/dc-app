import {chatActions} from "@/store/chat";
import {AppMiddlewareAPI} from "@/store/store";
import {friendsActions} from "@/store/friends";
import {roomSlice} from "@/store/room";
import {UserData} from "@/store/room/types";
import {Friend, FriendInvitation} from "@/store/friends/types";
import {CHAT_TYPES, Message} from "@/store/chat/types";
import {getPeerConfiguration, handleParticipantLeftRoom, handleRTCFulfilledSignal, prepareNewRTCConnection} from "@/api/webRTC";
import {IoSocket} from "@/api/socket.io/connection";
import Peer from "simple-peer";
import { SocketEvent } from "@/shared/models/socket.model";
import toast from 'react-hot-toast';
import {UserResponse} from '@/store/user/types';
import {getTranslation} from '@/i18n/routing';

export type Room = {
   roomCreator: UserData,
   participants: UserData[],
   roomID: string,
}

export type SignalWithSocketID = { signal: Peer.SignalData, connectingUserSocketID: string }
type CurrentUserSocket = { currentlyConnectingUserSocketID: string };

export function getSocketHandlers({dispatch, getState}: AppMiddlewareAPI) {

   return {
      [SocketEvent.GetDirectChatHistory]: () => ({messages, participants, isInitial}: {
         messages: (Message & { author: { _id: string } })[],
         participants: any[],
         isInitial: boolean
      }) => {

         const {content, author} = messages.at(-1)!;
         const {username, _id} = author;
         const currentlyLoggedUser = getState().auth.user!;
         const shouldShowNotification = !document.hasFocus() && !isInitial &&
             currentlyLoggedUser.username !== username;

         dispatch({
            type: chatActions.SET_MESSAGES.type,
            payload: messages,
         })

         shouldShowNotification && Notification.requestPermission().then(() => {
            createNotification(`New message from ` + username, {
               body: content.length >= 50 ? content.slice(0, 50) + '...' : content,
               icon: 'next.svg'
            }, () => {
               console.log('Notification clicked', author);
               dispatch({
                  type: chatActions.SET_CHAT_DETAILS.type,
                  payload: {type: CHAT_TYPES.DIRECT, friend: {username, userID: _id}}
               });
            });
         });
      },

      [SocketEvent.UpdateFriendInvitations]: () => ({friendInvitations}: { friendInvitations: FriendInvitation[] }) => {
         dispatch({
            type: friendsActions.SET_FRIEND_INVITATIONS.type,
            payload: friendInvitations
         })
      },

      [SocketEvent.UpdateFriends]: () => ({friends}: { friends: Friend[] }) => {
         dispatch({
            type: friendsActions.SET_FRIENDS.type,
            payload: friends
         })
      },

      [SocketEvent.UpdateOnlineUsers]: () => ({users}: { users: Record<string, Friend> }) => {
         dispatch({
            type: friendsActions.SET_ONLINE_USERS.type,
            payload: users
         })
      },

      [SocketEvent.UserTyping]: () => ({username, isTyping}: { username: string, isTyping: boolean }) => {

         dispatch({
            type: chatActions.SET_CURRENTLY_TYPING_DATA.type,
            payload: {
               isTyping,
               username
            }
         })
      },

      [SocketEvent.CreateRoom]: () => ({roomDetails}: { roomDetails: { roomCreator: UserData, participants: UserData[], roomID: string, } }) => {
         dispatch({
            type: roomSlice.actions.SET_ROOM_DETAILS.type,
            payload: roomDetails,
         })
      },

      [SocketEvent.UpdateActiveRooms]: () => ({activeRooms}: { activeRooms: Room[] }) => {
         const {friends} = getState().friends;
         // const shouldSetActiveRooms = activeRooms.some(({roomCreator}) => {
         //    return friends.some(friend => roomCreator.userID === friend.userID);
         // });

         dispatch({
            type:  roomSlice.actions.SET_ACTIVE_ROOMS.type,
            payload: activeRooms,
         });
      },
      [SocketEvent.PrepareRTC]: (socket) => ({currentlyConnectingUserSocketID}: CurrentUserSocket) => {
         prepareNewRTCConnection({currentlyConnectingUserSocketID, peerConfig: {
               initiator: false,
               config: getPeerConfiguration(),
               stream: getState().room.localStream!,
            }});
         socket.emit(SocketEvent.InitRTC, {currentlyConnectingUserSocketID});
      },
      [SocketEvent.RTCInitResponse]: () => ({currentlyConnectingUserSocketID}: CurrentUserSocket) => {
         prepareNewRTCConnection({currentlyConnectingUserSocketID, peerConfig: {
               initiator: true,
               config: getPeerConfiguration(),
               stream: getState().room.localStream!,
            }});
      },
      [SocketEvent.RTCSignalFulfilled]: () => (data: SignalWithSocketID) => {
         handleRTCFulfilledSignal(data);
      },
      [SocketEvent.LeaveRoom]: () => ({leftParticipantSocketID}: { leftParticipantSocketID: string }) => {
         handleParticipantLeftRoom(leftParticipantSocketID);
      },
      [SocketEvent.NotifyFriendRoomCreated]: () => async ({user}: {user: UserResponse}) => {
         const t = await getTranslation('Notification.Success')
         debugger
         toast.success(t('friendRoomCreated', {
            username: user.username
         }), {
            icon: '🚪',
         });
      }
   } satisfies Partial<Record<SocketEvent, (socket: IoSocket) => (...args: any[]) => void>>
}

function createNotification(title: string, options: NotificationOptions, onClick: () => void) {
   const notification = new Notification(title, options);

   notification.onclick = () => {
      onClick();
      window.focus();
   }
}
