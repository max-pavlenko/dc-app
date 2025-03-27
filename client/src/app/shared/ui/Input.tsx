import {ComponentProps, FC} from 'react'

export type InputProps = ComponentProps<'input'>

const Input: FC<InputProps> = ({...props}) => {
   const {className, ...restProps} = props;

   return (
       <input className={`flex-grow w-full h-[40px] border border-black rounded-[4px] text-[#DCDDDE] bg-[#35393F]
         font-[16px] px-2 ${className || ''}`} {...restProps}/>
   );
};

export default Input;
