import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createNewRoom, joinRoom, leaveRoom} from '@/api/socket.io/connection';
import {closeAllConnections, getLocalStreamPreview, StreamHandler} from "@/api/webRTC";
import {Room} from "@/api/socket.io/handlers";
import {NullableMediaStream, RoomDetails} from "@/store/room/types";
import {store} from '@/store/store';

export type RoomState = {
   user: {
      isInRoom: boolean,
      isRoomCreator: boolean,
      isWithOnlyAudio: boolean,
   },
   roomDetails: RoomDetails | null,
   activeRooms: Room[],
   localStream: NullableMediaStream,
   remoteStreams: MediaStream[],
   audioOnly: boolean,
   isScreenShareActive: boolean,
   screenShareStream: NullableMediaStream,
}

const initialState: RoomState = {
   user: {
      isInRoom: false,
      isRoomCreator: false,
      isWithOnlyAudio: false,
   },
   roomDetails: null,
   activeRooms: [],
   localStream: null,
   remoteStreams: [],
   audioOnly: false,
   isScreenShareActive: false,
   screenShareStream: null
}

export const roomSlice = createSlice({
   name: 'room',
   initialState,
   reducers: {
      JOIN_ROOM: (state, {payload: {roomID}}: PayloadAction<{ roomID: string }>) => {
         state.roomDetails = {...state.roomDetails!, roomID};
         state.user = {...state.user, isInRoom: true, isRoomCreator: false}

         getLocalStreamPreview(state.audioOnly, (stream) => {
            store.dispatch({type: roomSlice.actions.SET_LOCAL_STREAM.type, payload: stream});
            joinRoom({roomID});
         });
      },
      LEAVE_ROOM: (state) => {
         const {localStream, roomDetails, screenShareStream} = state;
         console.log(state.roomDetails, 'state.roomDetails');
         
         leaveRoom(state.roomDetails!.roomID);

         if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            state.localStream = initialState.localStream;
         }

         if (screenShareStream) {
            screenShareStream.getTracks().forEach((track) => track.stop());
            state.screenShareStream = initialState.screenShareStream;
         }

         state.remoteStreams = initialState.remoteStreams;
         closeAllConnections();

         if(!roomDetails) return;

         state.roomDetails = initialState.roomDetails;
         state.user = initialState.user;
      },
      CREATE_ROOM: (state, action: PayloadAction<Partial<RoomState['user']>>) => {
         const {audioOnly} = state;
         state.user = {...state.user, ...action.payload};

         getLocalStreamPreview(audioOnly, stream => {
            store.dispatch({type: roomSlice.actions.SET_LOCAL_STREAM.type, payload: stream});
            createNewRoom();
         });
      },
      SET_ACTIVE_ROOMS: (state, action: PayloadAction<RoomState['activeRooms']>) => {
         state.activeRooms = action.payload;
      },
      SET_LOCAL_STREAM: (state, action: PayloadAction<MediaStream>) => {
         state.localStream = action.payload;
      },
      SET_ROOM_DETAILS: (state, action: PayloadAction<RoomState['roomDetails']>) => {
         state.roomDetails = action.payload;
      },
      PUSH_REMOTE_STREAM: (state, action: PayloadAction<RoomState['remoteStreams'][number]>) => {
         state.remoteStreams.push(action.payload);
      },
      FILTER_REMOTE_STREAMS: (state, {payload}: PayloadAction<string>) => {
         // @ts-ignore
         state.remoteStreams  = state.remoteStreams.filter(stream => stream.connectingUserSocketID !== payload);
      },
      SET_AUDIO_ONLY: (state, action: PayloadAction<boolean>) => {
         state.audioOnly = action.payload;
      },
      SET_SCREEN_SHARE_STREAM: (state, action: PayloadAction<NullableMediaStream>) => {
         state.screenShareStream = action.payload;
         state.isScreenShareActive = !!action.payload;
      }
   },
})
