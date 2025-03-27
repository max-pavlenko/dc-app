'use client';

import {ComponentProps, FC} from 'react'
import FriendsTitle from "@/code/features/friends/ui/friends-title";
import AnimateVisibilityChange from "@/shared/ui/AnimateVisibilityChange";

type Props = {
   title: string,
   isVisible: boolean,
} & ComponentProps<typeof AnimateVisibilityChange>;

const AnimateVisibility: FC<Props> = ({title, children, isVisible, ...props}) => {
   return (
       <AnimateVisibilityChange isVisible={isVisible} {...props}>
          <FriendsTitle>{title}</FriendsTitle>
          {children}
       </AnimateVisibilityChange>
   );
};

export default AnimateVisibility;
