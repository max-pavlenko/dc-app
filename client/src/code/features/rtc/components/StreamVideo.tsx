'use client';

import {FC, useEffect, useRef} from 'react'

import {NullableMediaStream} from "@/store/room/types";

type Props = {
   isLocalStream?: boolean,
   stream: NullableMediaStream,
};

const StreamVideo: FC<Props> = ({isLocalStream = false, stream}) => {
   const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
      const video = videoRef.current!;
      if(!video || !stream) return;

      video.srcObject = stream;

      video.onloadedmetadata = async () => {
         await video!.play();
      };
   }, [stream]);

   return (
       <div className='flex flex-1 w-full rounded-md bg-[var(--light-gray)]'>
          <video className='object-cover w-full' autoPlay muted={isLocalStream} ref={videoRef} />
       </div>
   );
};

export default StreamVideo;
