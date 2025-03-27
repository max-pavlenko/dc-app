'use client';

import {FC, useState} from 'react'
import {IconButton} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

type Props = {
   stream: MediaStream
};

const CameraButton: FC<Props> = ({stream}) => {
   const [isCameraEnabled, setIsCameraEnabled] = useState(true);

   const handleToggleCamera = () => {
      stream.getVideoTracks()[0].enabled = !isCameraEnabled;
      setIsCameraEnabled(!isCameraEnabled);
   };

   return (
       <IconButton onClick={handleToggleCamera}>
          {isCameraEnabled ? <VideocamIcon/> : <VideocamOffIcon/>}
       </IconButton>
   );
};

export default CameraButton;
