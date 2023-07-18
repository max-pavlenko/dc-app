import {store} from "@/store/store";
import {roomSlice} from "@/store/room";
import Peer, {Options} from 'simple-peer';
import {signalPeerData} from "@/api/socket.io/connection";
import {SignalWithSocketID} from "@/api/socket.io/handlers";

export type StreamHandler = (stream: MediaStream) => void

const peers: Record<string, Peer.Instance> = {};

const onlyAudioConstraints = {
   audio: true,
   video: false,
};

const defaultConstraints = {
   video: true,
   audio: true,
};

export const getPeerConfiguration = (): RTCConfiguration => {
   const turnIceServer = null;

   if (turnIceServer) {
      return {}
   } else {
      return {
         iceServers: [
            {
               urls: 'stun:stun.l.google.com:19302',
            }
         ]
      }
   }
}

export function handleParticipantLeftRoom(leftParticipantSocketID: string) {
   destroyPeer(leftParticipantSocketID);
   store.dispatch({type: roomSlice.actions.FILTER_REMOTE_STREAMS, payload: leftParticipantSocketID});
}

function destroyPeer(userSocketID: string) {
   const peer = peers[userSocketID];
   if(!peer) return;
   peer.destroy();
   delete peers[userSocketID];
}

export const closeAllConnections = () => {
   Object.entries(peers).forEach(([userSocketId]) => {
      destroyPeer(userSocketId)
   });
};

export function prepareNewRTCConnection({peerConfig, currentlyConnectingUserSocketID}: {
   currentlyConnectingUserSocketID: string,
   peerConfig: Options
}) {
   peers[currentlyConnectingUserSocketID] = new Peer(peerConfig);

   peers[currentlyConnectingUserSocketID].on('signal', (signal) => {
      const signalData = {
         signal,
         connectingUserSocketID: currentlyConnectingUserSocketID,
      };
      signalPeerData(signalData);
   })

   peers[currentlyConnectingUserSocketID].on('stream', (remoteStream) => {
      console.log('new stream event', remoteStream);
      remoteStream.connectingUserSocketID = currentlyConnectingUserSocketID;
      store.dispatch({type: roomSlice.actions.PUSH_REMOTE_STREAM, payload: remoteStream});
   });
}

export const getLocalStreamPreview = (onlyAudio = false, onSuccess?: StreamHandler) => {
   const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

   navigator.mediaDevices.getUserMedia(constraints)
       .then((stream) => {
          if (Object.entries(stream.getTracks()).length === 0) return;
          onSuccess && onSuccess(stream);
          store.dispatch({type: roomSlice.actions.SET_LOCAL_STREAM, payload: stream});
       })
       .catch((err) => {
          console.log(err);
          console.log("Cannot get an access to local stream");
       });
};

export const switchOutgoingTracks = (stream: MediaStream) => {
   for (let socketId in peers) {
      const peerStream = peers[socketId].streams[0];

      for (let peerIndex in peerStream.getTracks()) {
         const peerTrack = peerStream.getTracks()[peerIndex];

         for (let streamIndex in stream.getTracks()) {
            const streamTrack = stream.getTracks()[streamIndex];

            if (peerTrack.kind === streamTrack.kind) {
               peers[socketId].replaceTrack(peerTrack, streamTrack, peerStream);
               break;
            }
         }
      }
   }
};

export function handleRTCFulfilledSignal({signal, connectingUserSocketID}: SignalWithSocketID) {
   console.log('peers', peers, {signal, connectingUserSocketID}, peers[connectingUserSocketID])
   if (!peers[connectingUserSocketID]) return;
   peers[connectingUserSocketID].signal(signal);
}
