import {ComponentProps, PropsWithChildren} from 'react'
import InputWithLabel, {LabeledInputChangeHandler, LabeledInputProps} from "@/app/shared/ui/InputWithLabel";

type Props<T extends Record<string, any>> = {
   onInputChange: LabeledInputChangeHandler,
   inputsState: T,
   inputsData: (LabeledInputProps & { error: string })[],
} & ComponentProps<'form'>;

const VerticalInputsForm = <T extends Record<string, any>>({
                                                              inputsData,
                                                              onInputChange,
                                                              inputsState,
                                                              children,
                                                              ...props
                                                           }: PropsWithChildren<Props<T>>) => {


   return (
       <>
          <form className='flex-col flex gap-[9px] mt-3' {...props}>
             {inputsData.map(({label, error, ...inputProps}) => {
                const inputValue = inputsState[label];
                return (
                    <div key={label}>
                       <InputWithLabel label={label} onChange={onInputChange} value={inputValue} {...inputProps}/>
                       <b style={{maxHeight: error ? 100 : 0,}} className='flex mt-1 text-red-400 text-[13px]'>{error}</b>
                    </div>
                )
             })}
             {children}
          </form>
       </>
   );
};

export default VerticalInputsForm;
