import {ComponentProps, FC} from 'react'
import FriendsTitle from "@/app/features/friends/components/FriendsTitle";
import AnimateVisibilityChange from "@/app/shared/ui/AnimateVisibilityChange";

type Props = {
   title: string,
   isVisible: boolean,
} & ComponentProps<typeof AnimateVisibilityChange>;

const AnimateVisibilityList: FC<Props> = ({title, children, isVisible}) => {


   return (
       <AnimateVisibilityChange isVisible={isVisible}>
          <FriendsTitle>{title}</FriendsTitle>
          {children}
       </AnimateVisibilityChange>
   );
};

export default AnimateVisibilityList;
