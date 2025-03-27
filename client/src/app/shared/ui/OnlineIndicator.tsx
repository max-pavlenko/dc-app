import {ComponentProps, FC, PropsWithChildren} from 'react'

type Props = {} & ComponentProps<'div'>;

const OnlineIndicator: FC<PropsWithChildren<Props>> = ({children, className, ...props}) => {

   return (
       <div style={{minWidth: 17, minHeight: 17}} className={`bg-[#3ba55d] rounded-full ${className}`} {...props} >
          {children}
       </div>
   );
};

export default OnlineIndicator;
