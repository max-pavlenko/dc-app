import React, {FC, PropsWithChildren} from 'react'
import {Button, ButtonProps} from "@mui/material";

type Props = {} & ButtonProps;

const SidebarButton: FC<PropsWithChildren<Props>> = ({ children, className, style, ...props}) => {
   return (
       <Button {...props} style={{...style, height: 48}} className={`w-10 rounded-md bg-indigo-500 ${className}`}>
          {children}
       </Button>
   );
};

export default SidebarButton;
