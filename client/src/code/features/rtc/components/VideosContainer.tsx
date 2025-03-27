'use client';

import {FC} from 'react'
import {useAppSelector} from "@/store/store";
import StreamVideo from './StreamVideo';

type Props = {};

const VideosContainer: FC<Props> = ({}) => {
   const {screenShareStream, localStream, remoteStreams} = useAppSelector(state => state.room);
   const stream = screenShareStream ? screenShareStream : localStream;

   return (
       <div className='flex overflow-hidden flex-wrap h-full w-full'>
          <StreamVideo isLocalStream stream={stream} />
          {remoteStreams.map((stream) => (
              <StreamVideo stream={stream} key={(stream as any).currentlyConnectingUserSocketID} />
          ))}
       </div>
   );
};

export default VideosContainer;


