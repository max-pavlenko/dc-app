import React, {FC} from 'react';
import {Typography} from "@mui/material";

type Props = {
   title?: string,
   description?: string,
}

const FormHeader: FC<Props> = ({title = 'Welcome back!', description = 'What\'s up so far?'}) => {
   return (
       <>
          <Typography className='text-white' variant='h5'>
             {title}
          </Typography>
          <Typography sx={{color: '#b9bbbe'}}>
             {description}
          </Typography>
       </>
   );
};

export default FormHeader;
