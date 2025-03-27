'use client';

import {FC} from 'react';
import PageSizedForm from '@/shared/ui/PageSizedForm';
import FormHeader from '@/shared/ui/FormHeader';
import PrimaryButton from '@/shared/ui/PrimaryButton';
import Redirect from '@/code/features/auth/components/redirect';
import Input from '@/shared/ui/Input';
import { useAppDispatch, useAppSelector} from '@/store/store';
import HeroImage from '@/shared/ui/HeroImage';
import {RegisterForm} from '@/shared/types/auth';
import {useForm} from 'react-hook-form';
import {SCHEMAS} from '@/validation/schemas';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {register} from '@/store/user/actions/thunks/register';

type Props = {};

const RegisterPage: FC<Props> = () => {
   const dispatch = useAppDispatch();
   const router = useRouter();
   const tRegister = useTranslations('Pages.Register');
   const t = useTranslations('');
   const {isLoading} = useAppSelector(state => state.auth);
   
   const {control, handleSubmit} = useForm<RegisterForm>({
      resolver: yupResolver(SCHEMAS(t).register),
      defaultValues: {
         username: '',
         email: '',
         password: '',
      },
   });
   
   const onSubmit = handleSubmit(async data => {
      try {
         await dispatch(register(data)).unwrap();
         router.push('/dashboard');
      } catch (error) {
      
      }
   });
   
   return (
       <div className="relative">
          <PageSizedForm>
             <FormHeader title={tRegister('title')} description={tRegister('description')}/>
             <form onSubmit={onSubmit} className="flex-col mb-4 flex gap-2 mt-3">
                <Input name="username" label={t('Common.username')} control={control}/>
                <Input placeholder="example@gmail.com" name="email" label={t('Common.email')} control={control}/>
                <Input name="password" label={t('Common.password')} type="password" control={control}/>
                <PrimaryButton disabled={isLoading} className="mt-2" type="submit">
                   {tRegister('submit')}
                </PrimaryButton>
             </form>
             <Redirect href="/login" description={tRegister('alreadyHaveAccount')}>
                {tRegister('logIn')}
             </Redirect>
          </PageSizedForm>
          <HeroImage outerWrapperClassName="bottom-0 left-0" innerWrapperClassName="lg:h-[60vh] h-[75vh]" imageProps={{
             src: 'https://resume-io-helpscout.s3.amazonaws.com/1644317987059/assets/hero-image.svg',
             className: 'scale-x-[-1]',
             alt: 'bg'
          }}/>
       </div>
   );
};

export default RegisterPage;
