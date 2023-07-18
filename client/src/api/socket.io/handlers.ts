import {chatActions} from "@/store/chat";
import {AppMiddlewareAPI} from "@/store/store";
import {friendsActions} from "@/store/friends";
import {roomSlice} from "@/store/room";
import {UserData} from "@/store/room/types";
import {Friend, FriendInvitation} from "@/store/friends/types";
import {CHAT_TYPES, Message} from "@/store/chat/types";
import {getPeerConfiguration, handleParticipantLeftRoom, handleRTCFulfilledSignal, prepareNewRTCConnection} from "@/api/webRTC";
import {Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {IoSocket} from "@/api/socket.io/connection";
import Peer from "simple-peer";

export type Room = {
   roomCreator: UserData,
   participants: UserData[],
   roomID: string,
}

export type SignalWithSocketID = { signal: Peer.SignalData, connectingUserSocketID: string }

export function getSocketHandlers({dispatch, getState}: AppMiddlewareAPI) {

   return {
      getDirectChatHistory: () => ({messages, participants, isInitial}: {
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

      updateFriendInvitations: () => ({friendInvitations}: { friendInvitations: FriendInvitation[] }) => {
         dispatch({
            type: friendsActions.SET_FRIEND_INVITATIONS.type,
            payload: friendInvitations
         })
      },

      updateFriends: () => ({friends}: { friends: Friend[] }) => {
         dispatch({
            type: friendsActions.SET_FRIENDS.type,
            payload: friends
         })
      },

      updateOnlineUsers: () => ({users}: { users: Record<string, Friend> }) => {
         dispatch({
            type: friendsActions.SET_ONLINE_USERS.type,
            payload: users
         })
      },

      getUserTypingMessage: () => ({username, isTyping}: { username: string, isTyping: boolean }) => {

         dispatch({
            type: chatActions.SET_CURRENTLY_TYPING_DATA.type,
            payload: {
               isTyping,
               username
            }
         })
      },

      createdNewRoom: () => ({roomDetails}: { roomDetails: { roomCreator: UserData, participants: UserData[], roomID: string, } }) => {
         dispatch({
            type: roomSlice.actions.SET_ROOM_DETAILS.type,
            payload: roomDetails,
         })
      },

      updateActiveRooms: () => ({activeRooms}: { activeRooms: Room[] }) => {
         const {friends} = getState().friends;
         // const shouldSetActiveRooms = activeRooms.some(({roomCreator}) => {
         //    return friends.some(friend => roomCreator.userID === friend.userID);
         // });

         dispatch({
            type:  roomSlice.actions.SET_ACTIVE_ROOMS.type,
            payload: activeRooms,
         });
      },

      prepareRTC: (socket) => ({currentlyConnectingUserSocketID}: CurrentUserSocket) => {
         console.warn('initRTC', currentlyConnectingUserSocketID);
         prepareNewRTCConnection({currentlyConnectingUserSocketID, peerConfig: {
               initiator: false,
               config: getPeerConfiguration(),
               stream: getState().room.localStream!,
            }});
         socket.emit('initRTC', {currentlyConnectingUserSocketID});
      },

      getRTCInitResponse: () => ({currentlyConnectingUserSocketID}: CurrentUserSocket) => {
         console.warn('getRTCInitResponse', currentlyConnectingUserSocketID)
         prepareNewRTCConnection({currentlyConnectingUserSocketID, peerConfig: {
               initiator: true,
               config: getPeerConfiguration(),
               stream: getState().room.localStream!,
            }});
      },

      fulfilledRTCSignal: socket => (data: SignalWithSocketID) => {
         handleRTCFulfilledSignal(data);
      },

      participantLeftRoom: socket => ({leftParticipantSocketID}: { leftParticipantSocketID: string }) => {
         handleParticipantLeftRoom(leftParticipantSocketID);
      }
   } satisfies Record<string, (socket: IoSocket) => (...args: any[]) => void>
}

function createNotification(title: string, options: NotificationOptions, onClick: () => void) {
   const notification = new Notification(title, options);

   notification.onclick = () => {
      onClick();
      window.focus();
   }
}

export type CurrentUserSocket = { currentlyConnectingUserSocketID: string };
