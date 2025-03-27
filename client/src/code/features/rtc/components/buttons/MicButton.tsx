'use client';

import {FC, useState} from 'react'
import {IconButton} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import {useAppSelector} from "@/store/store";

type Props = {};

const MicButton: FC<Props> = ({}) => {
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const {localStream} = useAppSelector(state => state.room);

  const handleToggleMic = () => {
    localStream!.getAudioTracks()[0].enabled = !isMicEnabled;
    setIsMicEnabled(prevState => !prevState);
  };

  return (
    <IconButton onClick={handleToggleMic} style={{ color: "white" }}>
      {isMicEnabled ? <MicIcon /> : <MicOffIcon />}
    </IconButton>
  );
};

export default MicButton;
