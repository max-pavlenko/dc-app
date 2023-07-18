import Link, {LinkProps} from "next/link";
import {FC, PropsWithChildren} from "react";

type Props = LinkProps;

const BlueLink: FC<PropsWithChildren<Props>> = ({children, ...props}) => {


   return (
       <Link className='text-[#00AFF4] font-[500] text-[14.5px]' {...props}>
          {children}
       </Link>
   );
};

export default BlueLink;
