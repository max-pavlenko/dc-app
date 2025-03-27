import {FC, PropsWithChildren} from 'react'
import {Button, ButtonProps} from "@mui/material";

const PrimaryButton: FC<PropsWithChildren<ButtonProps>> = ({children, ...props}) => {


   return (
       <Button variant='contained' sx={{
          textTransform: 'none',
          bgcolor: '#5865f2',
          color: 'white',
          fontWeight: 500,
          fontSize: '16px',
          width: '100%',
       }} {...props}>
          {children}
       </Button>
   );
};

export default PrimaryButton;
