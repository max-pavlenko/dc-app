import {FC} from 'react'
import {Typography} from "@mui/material";
import UnderlineHighlight from "@/app/shared/ui/UnderlineHighlight";

type Props = {};

const WelcomeMessage: FC<Props> = ({}) => {


   return (
       <div className='flex flex-1 items-center justify-center'>
          <Typography variant='h6'>
             Choose a conversation to start chatting
             <UnderlineHighlight className='w-[40%] h-[3px]'/>
          </Typography>
       </div>
   );
};

export default WelcomeMessage;
