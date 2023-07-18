import {CSSProperties, FC, useState} from 'react'
import VideosContainer from "@/app/features/videoRooms/components/VideosContainer";
import RoomButtons from "@/app/features/videoRooms/components/buttons/RoomButtons";
import ResizeRoomButton from "@/app/features/videoRooms/components/buttons/ResizeRoomButton";

type Props = {};

const fullScreenRoomStyle: CSSProperties = {
   width: "100%",
   height: "100vh",
   bottom: 0,
   right: 0,
};

const minimizedRoomStyle: CSSProperties = {
   width: "30%",
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
