import {FC, PropsWithChildren} from 'react';
import UnderlineHighlight from "@/app/shared/ui/UnderlineHighlight";

type Props = {};

const TextSeparator: FC<PropsWithChildren<Props>> = ({children}) => {


   return (
       <div className='flex items-center mb-3'>
          <UnderlineHighlight/>
          <span className='rounded-md text-[#b9bbbe] mx-3 whitespace-nowrap text-[12px] text-center'>
               {children}
            </span>
          <UnderlineHighlight/>
       </div>
   );
};

export default TextSeparator;
