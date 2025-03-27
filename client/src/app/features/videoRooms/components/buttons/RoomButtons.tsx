import {FC, PropsWithChildren} from 'react'
import {useAppSelector} from "@/store/store";
import ScreenShareButton from "@/app/features/videoRooms/components/buttons/ScreenShareButton";
import MicButton from "@/app/features/videoRooms/components/buttons/MicButton";
import CloseRoomButton from "@/app/features/videoRooms/components/buttons/CloseRoomButton";
import CameraButton from "@/app/features/videoRooms/components/buttons/CameraButton";

type Props = {};

const RoomButtons: FC<PropsWithChildren<Props>> = ({children}) => {
   const {localStream, audioOnly,} = useAppSelector(state => state.room);

   return (
       <div className='flex bg-[var(--light-gray)] w-full border-t-2 border-[rgb(var(--violet-rgb))] items-center justify-center'>
          {!audioOnly && <ScreenShareButton />}
          <MicButton />
          <CloseRoomButton />
          {!audioOnly && <CameraButton stream={localStream!} />}
          {children}
       </div>
   );
};

export default RoomButtons;
