import {FC, InputHTMLAttributes} from 'react'
import Input, {InputProps} from "@/app/shared/ui/Input";

export type LabeledInputProps<T = string> = {
   label: T,
} & Omit<InputProps, 'onChange'>;
export type LabeledInputChangeHandler = (newValue: { name: string; value: string }) => void;

type Props = {
   onChange: LabeledInputChangeHandler,
   value: InputHTMLAttributes<string | number>,
} & LabeledInputProps;

const InputWithLabel: FC<Props> = ({label, onChange, value, ...inputProps}) => {
   return (
       <div className='flex flex-col gap-1'>
          <label className='uppercase' htmlFor={label}>{label}</label>
          <Input name={label} onChange={e => onChange({name: label, value: e.target.value})} id={label} {...inputProps}/>
       </div>
   );
};

export default InputWithLabel;
