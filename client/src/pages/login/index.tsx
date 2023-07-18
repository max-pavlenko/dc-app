import {Tooltip} from "@mui/material";
import {LoginFormValues} from "@/types/Login";
import {LabeledInputProps} from "@/app/shared/ui/InputWithLabel";
import PageSizedForm from "@/app/shared/ui/PageSizedForm";
import FormHeader from "@/app/shared/components/FormHeader";
import VerticalInputsForm from "@/app/shared/ui/VerticalInputsForm";
import PrimaryButton from "@/app/shared/ui/PrimaryButton";
import RedirectText from "@/app/features/auth/components/RedirectText";
import {useActions, useAppSelector} from "@/store/store";
import useForm from "@/hooks/useForm";
import HeroImage from "@/app/shared/ui/HeroImage";
import React from "react";
import {loginValidationSchema} from "@/validation/schemas";

const INITIAL_FORM_VALUES = {
   email: '',
   password: '',
}

const LoginPage = ({}) => {
   const {login} = useActions();
   const {formData, isFormValid, formErrors, handleFormInputChange, handleSubmit} = useForm({
      validationSchema: loginValidationSchema,
      initialValues: INITIAL_FORM_VALUES,
      onSubmit: async (formData) => {
         login(formData);
      }
   });
   const {isLoading} = useAppSelector(state => state.auth);

   const INPUTS_ATTRIBUTES_DATA: (LabeledInputProps<keyof LoginFormValues> & { error: string })[] = [
      {label: 'email', placeholder: 'example@gmail.com', type: 'email', error: formErrors.email},
      {label: 'password', type: 'password', error: formErrors.password},
   ];

   return (
       <main className='relative'>
          <PageSizedForm>
             <FormHeader/>
             <VerticalInputsForm onSubmit={handleSubmit} inputsData={INPUTS_ATTRIBUTES_DATA}
                                 onInputChange={handleFormInputChange} inputsState={formData}>
                <Tooltip title={!isFormValid && 'Check the form for mistakes!'}>
                   <div className='flex justify-center'>
                      <PrimaryButton className='mt-2 w-[80%] md:w-1/2' disabled={!isFormValid || isLoading} type='submit'>
                         Log in
                      </PrimaryButton>
                   </div>
                </Tooltip>
             </VerticalInputsForm>
             <RedirectText href='/register' linkText='Create a one' redirectDescription='Need an account?'/>
          </PageSizedForm>
          <HeroImage outerWrapperClassName='bottom-0 left-0' innerWrapperClassName='lg:h-[60vh] h-[75vh]' imageProps={{
             src: 'https://resume-io-helpscout.s3.amazonaws.com/1644317987059/assets/hero-image.svg',
             alt: 'bg'
          }}/>
       </main>
   );
};

export default LoginPage;
