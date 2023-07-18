import React, {FC} from 'react'
import {Typography} from "@mui/material";
import BlueLink from "@/app/shared/ui/BlueLink";

type Props = {
   href: string,
   linkText: string,
   redirectDescription: string,
};

const RedirectText: FC<Props> = ({href = '/register', linkText = '', redirectDescription = ''}) => {


   return (
       <div className='flex gap-1 items-center justify-end mt-[15px]'>
          <Typography
              sx={{color: "#72767d", fontSize: 14}}
              variant="subtitle2"
          >
             {redirectDescription}
          </Typography>
          <BlueLink href={href}>{linkText}</BlueLink>
       </div>
   );
};

export default RedirectText;
