import {FC} from 'react'
import {Avatar, AvatarProps} from "@mui/material";

type Props = {
   name: string
} & AvatarProps;

const LetteredAvatar: FC<Props> = ({name, className, ...props}) => {
   return (
       <Avatar variant='rounded' className={`w-full h-full ${className}`} {...props}>
          {name.substring(0, 2)}
       </Avatar>
   );
};

export default LetteredAvatar;
