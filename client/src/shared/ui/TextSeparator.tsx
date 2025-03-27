import {FC, PropsWithChildren} from 'react';
import UnderlineHighlight from "@/shared/ui/UnderlineHighlight";

type Props = {};

const TextSeparator: FC<PropsWithChildren<Props>> = ({children}) => {
   return (
       <div className='flex items-center mb-3'>
          <UnderlineHighlight className='bg-[var(--light-gray)]'/>
          <span className='rounded-md text-blue-200 mx-3 whitespace-nowrap text-[12px] text-center'>
               {children}
            </span>
          <UnderlineHighlight className='bg-[var(--light-gray)]'/>
       </div>
   );
};

export default TextSeparator;
