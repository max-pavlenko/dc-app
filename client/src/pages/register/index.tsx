import {FC} from 'react'
import PageSizedForm from "@/app/shared/ui/PageSizedForm";
import FormHeader from "@/app/shared/components/FormHeader";
import VerticalInputsForm from "@/app/shared/ui/VerticalInputsForm";
import {Tooltip} from "@mui/material";
import PrimaryButton from "@/app/shared/ui/PrimaryButton";
import RedirectText from "@/app/features/auth/components/RedirectText";
import {RegisterFormValues} from "@/types/Register";
import {LabeledInputProps} from "@/app/shared/ui/InputWithLabel";
import {useActions} from "@/store/store";
import useForm from "@/hooks/useForm";
import HeroImage from "@/app/shared/ui/HeroImage";
import {registerValidationSchema} from "@/validation/schemas";

type Props = {};

const INITIAL_FORM_VALUES = {
   username: '',
   email: '',
   password: '',
}

const RegisterPage: FC<Props> = ({}) => {
   const {register} = useActions();
   const {formData, isFormValid, formErrors, handleFormInputChange, handleSubmit} = useForm({
      validationSchema: registerValidationSchema,
      initialValues: INITIAL_FORM_VALUES,
      onSubmit: async (formData) => {
         register(formData);
      }
   });

   const INPUTS_METADATA: (LabeledInputProps<keyof RegisterFormValues> & { error: string })[] = [
      {label: 'username', placeholder: 'John Doe', error: formErrors.username},
      {label: 'email', placeholder: 'example@gmail.com', type: 'email', error: formErrors.email},
      {label: 'password', type: 'password', error: formErrors.password},
   ];

   return (
       <main className='relative'>
          <PageSizedForm>
             <FormHeader title='Good to see ya!' description='Sign up for free'/>
             <VerticalInputsForm onSubmit={handleSubmit} inputsData={INPUTS_METADATA}
                                 onInputChange={handleFormInputChange} inputsState={formData}>
                <Tooltip title={!isFormValid && 'Check the form for mistakes!'}>
                   <div className='flex justify-center'>
                      <PrimaryButton className='mt-2 w-[80%] md:w-1/2' disabled={!isFormValid} type='submit'>
                         Register
                      </PrimaryButton>
                   </div>
                </Tooltip>
             </VerticalInputsForm>
             <RedirectText href='/login' linkText='Login' redirectDescription='Already have an account?'/>
          </PageSizedForm>
          <HeroImage outerWrapperClassName='bottom-0 left-0' innerWrapperClassName='lg:h-[60vh] h-[75vh]' imageProps={{
             src: 'https://resume-io-helpscout.s3.amazonaws.com/1644317987059/assets/hero-image.svg',
             className: 'scale-x-[-1]',
             alt: 'bg'
          }}/>
       </main>
   );
};

export default RegisterPage;
