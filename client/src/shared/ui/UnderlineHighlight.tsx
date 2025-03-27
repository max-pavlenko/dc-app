import {ComponentProps, FC} from 'react'
import {twMerge} from 'tailwind-merge';

type Props = {} & ComponentProps<'div'>;

const UnderlineHighlight: FC<Props> = ({className, ...props}) => {
   return (
       <div className={twMerge(`w-[50%] mx-auto rounded-2xl h-[2px] bg-custom-violet`, className)} {...props}/>
   );
};

export default UnderlineHighlight;
