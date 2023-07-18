import {FC} from 'react'
import {Avatar, Button, ButtonProps, Typography} from "@mui/material";
import OnlineIndicator from "@/app/shared/ui/OnlineIndicator";
import AnimateVisibilityChange from "@/app/shared/ui/AnimateVisibilityChange";
import {useAppSelector} from "@/store/store";
import Image from "next/image";
import {Friend} from "@/store/friends/types";

type Props = {
   friend: Friend & { isOnline: boolean },
} & ButtonProps;

const FriendButton: FC<Props> = ({friend: {username, isOnline}, className, ...props}) => {
   const {isTyping, username: typingUsername} = useAppSelector(state => state.chat.chat.currentlyTypingData);

   return (
       <Button className={`flex gap-1.5 items-center justify-center w-full transform-none relative ${className}`} {...props}>
          <div className='relative'>
             <Avatar sx={{width: '33px', height: '33px'}} alt={username}/>
             <AnimateVisibilityChange isVisible={isOnline }>
                <OnlineIndicator className='absolute left-0 border-[#2F3136] border-4 bottom-[-4px]' />
             </AnimateVisibilityChange>
             <AnimateVisibilityChange isVisible={isTyping && username === typingUsername}>
                <Image className='absolute left-1/2 bottom-[-4px]' src='/pencil.svg' alt='pencil' width={20} height={20}/>
             </AnimateVisibilityChange>
          </div>
          <Typography className='font-bold text-sm normal-case text-[#8e9297]' align="left" variant="subtitle1">
             {username.length > 5 ? username.slice(0, 5) + '...' : username}
          </Typography>

       </Button>
   );
};

export default FriendButton;
