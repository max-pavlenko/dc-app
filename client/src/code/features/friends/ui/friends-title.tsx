'use client';

import {FC, PropsWithChildren} from 'react'
import {Typography} from "@mui/material";
import UnderlineHighlight from "@/shared/ui/UnderlineHighlight";

type Props = {};

const FriendsTitle: FC<PropsWithChildren<Props>> = ({children}) => {
   return (
       <div className='flex flex-col items-center'>
          <Typography variant='subtitle2' className='uppercase font-bold text-center mt-2.5 text-[#8e9297]'>
             {children}
             <UnderlineHighlight className='mb-1'/>
          </Typography>
       </div>
   );
};

export default FriendsTitle;
