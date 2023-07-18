import {ComponentProps, FC} from 'react'

type Props = {} & ComponentProps<'div'>;

const UnderlineHighlight: FC<Props> = ({className, ...props}) => {
   return (
       <div className={`w-[50%] mx-auto rounded-2xl h-[2px] bg-custom-violet ${className}`} {...props}/>
   );
};

export default UnderlineHighlight;
