'use client';

import {FC} from 'react'
import {Avatar, Button, ButtonProps, Typography} from "@mui/material";
import Indicator from "@/shared/ui/Indicator";
import AnimateVisibilityChange from "@/shared/ui/AnimateVisibilityChange";
import {useAppSelector} from "@/store/store";
import Image from "next/image";
import {Friend} from "@/store/friends/types";
import {LuPencil} from 'react-icons/lu';

type Props = {
   friend: Friend & { isOnline: boolean },
} & ButtonProps;

const Friend: FC<Props> = ({friend: {username, avatar, isOnline}, className, ...props}) => {
   const {isTyping, username: typingUsername, } = useAppSelector(state => state.chat.chat.currentlyTypingData);

   return (
       <Button className={`flex gap-1.5 items-center justify-center w-full transform-none relative ${className}`} {...props}>
          <div className='relative'>
             <Avatar src={avatar} sx={{width: '25px', height: '25px'}} alt={username}/>
             <AnimateVisibilityChange isVisible={isOnline}>
                <Indicator className='absolute left-0 border-[#2F3136] border-4 bottom-[-4px]' />
             </AnimateVisibilityChange>
             <AnimateVisibilityChange isVisible={isTyping && username === typingUsername}>
                <LuPencil className='absolute text-slate-300 size-5 -left-5 -top-5' />
             </AnimateVisibilityChange>
          </div>
          <Typography className='font-bold text-sm normal-case text-[#8e9297]' align="left" variant="subtitle1">
             {username.length > 5 ? username.slice(0, 5) + '...' : username}
          </Typography>

       </Button>
   );
};

export default Friend;
