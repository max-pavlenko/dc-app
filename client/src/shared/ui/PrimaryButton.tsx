import {FC, PropsWithChildren} from 'react'
import {Button, ButtonProps} from "@mui/material";
import {twMerge} from 'tailwind-merge';

const PrimaryButton: FC<PropsWithChildren<ButtonProps>> = ({children, className, ...props}) => {
   return (
       <Button variant='contained' className={twMerge(className, 'w-full text-base text-white bg-indigo-700')} sx={{textTransform: 'none',}} {...props}>
          {children}
       </Button>
   );
};

export default PrimaryButton;
