'use client';

import {FC} from 'react'
import {IconButton} from "@mui/material";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import {useActions, useAppSelector} from "@/store/store";
import {switchOutgoingTracks} from "@/api/webRTC";

type Props = {};

const CONSTRAINTS = {
   audio: false,
   video: true,
};

const ScreenShareButton: FC<Props> = ({}) => {
   const {localStream, screenShareStream, isScreenShareActive} = useAppSelector(state => state.room);
   const {SET_SCREEN_SHARE_STREAM} = useActions();

   const handleScreenShareToggle = async () => {
      if (isScreenShareActive) {
         switchOutgoingTracks(localStream!);
         screenShareStream!.getTracks().forEach((t) => t.stop());
         SET_SCREEN_SHARE_STREAM(null);
         return;
      }

      try {
         const stream = await navigator.mediaDevices.getDisplayMedia(CONSTRAINTS);
         if (!stream) return;
         SET_SCREEN_SHARE_STREAM(stream);
         switchOutgoingTracks(stream);
      } catch (err) {
         console.log("error occured when trying to get an access to screen share stream", err);
      }
   };

   return (
       <IconButton onClick={handleScreenShareToggle} style={{color: "white"}}>
          {isScreenShareActive ? <StopScreenShareIcon/> : <ScreenShareIcon/>}
       </IconButton>
   );
};

export default ScreenShareButton;
