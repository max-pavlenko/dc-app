'use client';

import {CSSProperties, FC, useState} from 'react'
import VideosContainer from './VideosContainer';
import RoomButtons from './buttons/RoomButtons';
import ResizeRoomButton from './buttons/ResizeRoomButton';

type Props = {};

const fullScreenRoomStyle: CSSProperties = {
   width: "100%",
   height: "100vh",
   bottom: 0,
   right: 0,
};

const minimizedRoomStyle: CSSProperties = {
   width: "max(30%, 250px)",
   height: "40vh",
};

const Room: FC<Props> = ({}) => {
   const [isRoomMinimized, setIsRoomMinimized] = useState(true);

   const handleRoomResize = () => {
      setIsRoomMinimized(!isRoomMinimized);
   };

   return (
       <div className='fixed bottom-[10px] right-[10px] flex flex-col items-center justify-center rounded-md bg-[#202225]'
            style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}>
         <VideosContainer />
          <RoomButtons>
             <ResizeRoomButton
                 isRoomMinimized={isRoomMinimized}
                 onClick={handleRoomResize}
             />
          </RoomButtons>
       </div>
   );
};

export default Room;

