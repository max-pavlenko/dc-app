'use client';

import {ComponentProps, PropsWithChildren} from 'react';
import {Control, Controller} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';

export type LabeledInputProps = {
   label?: string;
   multiline?: boolean;
} & Pick<ComponentProps<'input'>, 'type' | 'onChange' | 'autoFocus' | 'className' | 'placeholder'>;

type Props = {
   control: Control<any>;
   name: string;
};

const Input = ({label, control, multiline, name, onChange, className, children, ...inputProps}: PropsWithChildren<Props & LabeledInputProps>) => {
   const Comp = multiline ? 'textarea' : 'input';
   
   return (
       <Controller control={control} render={({fieldState, field: {onChange, value}}) => (
           <div className="flex flex-col w-full gap-1">
              <div className='flex justify-between'>
                 {label && <label htmlFor={label}>{label}</label>}
                 {children}
              </div>
              
              <Comp name={label} value={value} onChange={onChange} id={label}
                    style={{minHeight: 40}}
                    className={twMerge(multiline && 'pt-2', fieldState.error?.message && '!border-red-600 !border-2', `
                    [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                    flex border  border-black rounded-md text-base h-10 max-h-40 bg-slate-700 text-[#DCDDDE] flex-grow w-full text-[16px] px-2`, className)}
                    {...inputProps}
                    {...(multiline && {rows: 3, resize: 'vertical'})}
              />
              <b style={{maxHeight: fieldState.error?.message ? 100 : 0,}} className="flex text-red-400 text-[13px]">
                 {fieldState.error?.message}
              </b>
           </div>
       )} name={name}/>
   );
};

export default Input;
