'use client';

import {FC, useState} from "react";
import {Typography} from "@mui/material";
import LetteredAvatar from "@/shared/ui/LetteredAvatar";
import AnimateVisibilityChange from "@/shared/ui/AnimateVisibilityChange";
import {useAppSelector} from "@/store/store";
import {Message} from "@/store/chat/types";
import {getTimeFormatter} from '@/shared/utils/time';
import {useTranslations} from 'next-intl';

type Props = {
   message: Omit<Message, 'date'> & {
      date: Date;
      writtenBySameAuthorAsPrevious: boolean;
      isMessageWrittenSameDayAsPrevious: boolean;
   }
};

const Message: FC<Props> = ({message: {author, date, content, isMessageWrittenSameDayAsPrevious, writtenBySameAuthorAsPrevious}}) => {
   const [isHovered, setIsHovered] = useState(false);
   const user = useAppSelector(state => state.auth.user);

   const hourDate = getTimeFormatter({hour12: true, hour: 'numeric', minute: 'numeric'}).format(date);
   const isUserAnAuthor = author.username === user?.username;
   const t = useTranslations();

   function handleMessageHover() {
      setIsHovered(true);
   }

   if (writtenBySameAuthorAsPrevious && isMessageWrittenSameDayAsPrevious) {
      return (
          <figure onMouseEnter={handleMessageHover} onMouseLeave={() => setIsHovered(false)}
                  className={`${isUserAnAuthor && 'ml-auto flex-row-reverse'} mt-[-5px] w-fit flex items-center text-[#DCDDDE]`}>
             <AnimateVisibilityChange className={`w-[${48}px] px-1`} isVisible={isHovered} withScaling={false}>
                <div className='text-[10px]'>{hourDate}</div>
             </AnimateVisibilityChange>
             <figcaption className='max-w-[400px] text-justify'>{content}</figcaption>
          </figure>
      );
   }

   return (
       <figure>
          <figcaption className={`flex items-center ${isUserAnAuthor ? "flex-row-reverse" : 'items-center'} gap-2`}>
             <LetteredAvatar sx={isUserAnAuthor ? {bgcolor: "rgb(var(--violet-rgb))"} : {}}
                             className={`!w-[40px] brightness-110 ${isUserAnAuthor && "grayscale-[.2]"} !h-[40px]`}
                             name={author.username}/>
             <div className={`flex ${isUserAnAuthor && 'ml-auto'} flex-col`}>
                <Typography className={`flex gap-2 items-center ${isUserAnAuthor && 'flex-row-reverse'}`} style={{fontSize: "16px", color: "white"}}>
                   <span className='truncate'>{isUserAnAuthor ? t('Common.you') : author.username}</span>
                   <span style={{fontSize: "12px", color: "#72767d"}}>{hourDate}</span>
                </Typography>
                <div className={`text-[#DCDDDE] break-all ${isUserAnAuthor ? 'ml-auto' : ''}`}>
                   {content}
                </div>
             </div>
          </figcaption>
       </figure>
   );
};

export default Message;
