import React, {ComponentProps, FC, PropsWithChildren} from 'react';
import Image from "next/image";

type Props = {
   imageProps: ComponentProps<typeof Image>,
   innerWrapperClassName?: string,
   outerWrapperClassName?: string,
}

const HeroImage: FC<PropsWithChildren<Props>> = ({imageProps: {className, ...props}, innerWrapperClassName, outerWrapperClassName}) => {

   return (
       <div className={`absolute w-full ${outerWrapperClassName}`}>
          <div className={`z-0 relative ${innerWrapperClassName}`}>
             <Image draggable={false} priority fill className={`w-full object-left lg:object-center object-cover ${className}`} {...props}/>
          </div>
       </div>
   );
};

export default HeroImage;
