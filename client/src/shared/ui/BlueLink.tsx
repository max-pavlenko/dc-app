import {ComponentProps, FC, PropsWithChildren} from 'react';
import {Link} from '@/i18n/routing';
import {twMerge} from 'tailwind-merge';

const BlueLink: FC<PropsWithChildren<ComponentProps<typeof Link>>> = ({children, className, ...props}) => {
   return (
       <Link className={twMerge(className, 'text-[#00AFF4] font-bold text-[15px]')} {...props}>
          {children}
       </Link>
   );
};

export default BlueLink;
