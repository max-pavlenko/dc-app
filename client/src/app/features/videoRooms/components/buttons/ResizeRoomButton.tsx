import {FC} from 'react'
import {IconButton} from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

type Props = {
   isRoomMinimized: boolean,
   onClick: () => void,
};

const ResizeRoomButton: FC<Props> = ({isRoomMinimized, onClick}) => {

   return (
       <div className=''>
          <IconButton onClick={onClick}>
             {isRoomMinimized ? <OpenInFullIcon/> : <CloseFullscreenIcon/>}
          </IconButton>
       </div>
   );
};

export default ResizeRoomButton;
