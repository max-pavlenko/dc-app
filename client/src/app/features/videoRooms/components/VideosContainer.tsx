import {FC} from 'react'
import StreamVideo from "@/app/features/videoRooms/components/StreamVideo";
import {useAppSelector} from "@/store/store";

type Props = {

};

const VideosContainer: FC<Props> = ({}) => {
   const {screenShareStream, localStream, remoteStreams} = useAppSelector(state => state.room);
   const stream = screenShareStream ? screenShareStream : localStream;

   return (
       <div className='flex overflow-hidden flex-wrap h-full w-full'>
          <StreamVideo isLocalStream stream={stream} />
          {remoteStreams.map((stream) => (
              <StreamVideo stream={stream} key={stream.id} />
          ))}
       </div>
   );
};

export default VideosContainer;
