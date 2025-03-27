'use client';

import Input from '@/shared/ui/Input';
import PageSizedForm from '@/shared/ui/PageSizedForm';
import FormHeader from '@/shared/ui/FormHeader';
import PrimaryButton from '@/shared/ui/PrimaryButton';
import Redirect from '@/code/features/auth/components/redirect';
import {useAppDispatch, useAppSelector} from '@/store/store';
import HeroImage from '@/shared/ui/HeroImage';
import {SCHEMAS} from '@/validation/schemas';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useRouter} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {Button} from '@mui/material';
import {IoLogoGoogle} from 'react-icons/io';
import {generateGoogleAuthUrl} from '@/shared/utils/auth';
import {login} from '@/store/user/actions/thunks/login';

const LoginPage = () => {
   const router = useRouter();
   const dispatch = useAppDispatch();
   const t = useTranslations();
   const tLogin = useTranslations('Pages.Login');
   const {isLoading} = useAppSelector(state => state.auth);
   
   
   const {control, handleSubmit} = useForm({
      defaultValues: {
         email: '',
         password: '',
      },
      resolver: yupResolver(SCHEMAS(t).login)
   });
   
   const onSubmit = handleSubmit(async data => {
      try {
         await dispatch(login(data));
         router.push(`/dashboard`);
      } catch (error) {
      }
   });
   
   return (
       <div className="relative">
          <PageSizedForm>
             <FormHeader title={tLogin('title')} description={tLogin('description')}/>
             <form onSubmit={onSubmit} className="flex-col mb-4 flex gap-2 mt-3">
                <Input placeholder="example@gmail.com" name="email" label={t('Common.email')} control={control}/>
                <Input name="password" label={t('Common.password')} type="password" control={control}>
                   <Link href="/forgot-password" className="text-sm font-bold text-blue-300 hover:underline">
                      {tLogin("forgotPassword")}
                   </Link>
                </Input>
                <PrimaryButton className="mt-2" disabled={isLoading} type="submit">
                   {tLogin('submit')}
                </PrimaryButton>
                <Button sx={{textTransform: 'none', fontSize: 16}}
                        color="secondary" variant="outlined"
                        onClick={() => window.open(generateGoogleAuthUrl(), '_self')}>
                   <IoLogoGoogle className="mr-2"/>
                   Google
                </Button>
             </form>
             <Redirect href="/register" description={tLogin('needAnAccount')}>
                {tLogin('createOne')}
             </Redirect>
          </PageSizedForm>
          <HeroImage outerWrapperClassName="bottom-0 left-0" innerWrapperClassName="lg:h-[60vh] h-[75vh]" imageProps={{
             src: 'https://resume-io-helpscout.s3.amazonaws.com/1644317987059/assets/hero-image.svg',
             alt: 'bg'
          }}/>
       </div>
   );
};

export default LoginPage;


