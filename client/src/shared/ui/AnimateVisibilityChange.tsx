'use client';

import {ComponentProps, FC, PropsWithChildren} from 'react'

type Props = {
   isVisible: boolean;
   withScaling?: boolean
} & ComponentProps<'div'>;

const AnimateVisibilityChange: FC<PropsWithChildren<Props>> = ({isVisible, children, withScaling = true, className, ...props}) => {
   return (
       <div className={`${isVisible ? 'visible scale-100 opacity-100' : `invisible opacity-0 ${withScaling && 'scale-75 h-0'}`} h-max-[1000px] ${className}`} {...props}>
          {children}
       </div>
   );
};

export default AnimateVisibilityChange;
