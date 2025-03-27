'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Typography} from '@mui/material';
import {MailOutline} from '@mui/icons-material';
import {useAppDispatch} from '@/store/store';
import {forgotPassword} from '@/store/user/actions/thunks/forgot-password';
import {SCHEMAS} from '@/validation/schemas';
import {useTranslations} from 'next-intl';
import PageSizedForm from '@/shared/ui/PageSizedForm';
import FormHeader from '@/shared/ui/FormHeader';
import Input from '@/shared/ui/Input';
import PrimaryButton from '@/shared/ui/PrimaryButton';
import Redirect from '@/code/features/auth/components/redirect';
import HeroImage from '@/shared/ui/HeroImage';

type ForgotPasswordFormData = {
   email: string
}

export default function ForgotPasswordPage() {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [emailSent, setEmailSent] = useState(false);
   const dispatch = useAppDispatch();
   const t = useTranslations();
   
   const {
      control,
      handleSubmit,
   } = useForm<ForgotPasswordFormData>({
      resolver: yupResolver(SCHEMAS(t).forgotPassword),
   });
   
   const onSubmit = async (data: ForgotPasswordFormData) => {
      setIsSubmitting(true);
      try {
         await dispatch(forgotPassword(data)).unwrap();
         setEmailSent(true);
      } finally {
         setIsSubmitting(false);
      }
   };
   
   return (
       <div>
          <PageSizedForm>
             {!emailSent ? (
                 <>
                    <FormHeader title={t('Pages.ForgotPassword.title')} description={t('Pages.ForgotPassword.description')}/>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex-col mb-4 flex gap-2 mt-3">
                       <Input placeholder="example@gmail.com" name="email" label={t('Common.email')} control={control}/>
                       <PrimaryButton className="mt-2" disabled={isSubmitting} type="submit">
                          {t('Pages.ForgotPassword.submit')}
                       </PrimaryButton>
                    </form>
                    <Redirect href="/login" description={t('Pages.ForgotPassword.rememberPassword')}>
                       {t('Pages.ForgotPassword.login')}
                    </Redirect>
                 </>
             ) : (
                 <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                    <Box
                        sx={{
                           backgroundColor: 'success.light',
                           borderRadius: '50%',
                           p: 1.5,
                           mb: 2,
                        }}
                    >
                       <MailOutline stroke='indigo' fontSize="large"/>
                    </Box>
                    <Typography component="h1" variant="h5" gutterBottom>
                       Check Your Email
                    </Typography>
                    <Typography variant="body1" paragraph>
                       We've sent a password reset link to your email address.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                       If you don't see it in your inbox, please check your spam folder. The link will expire in 1 hour.
                    </Typography>
                 </Box>
             )}
          </PageSizedForm>
          <HeroImage outerWrapperClassName="bottom-0 left-0" innerWrapperClassName="lg:h-[60vh] h-[75vh]" imageProps={{
             src: 'https://resume-io-helpscout.s3.amazonaws.com/1644317987059/assets/hero-image.svg',
             alt: 'bg'
          }}/>
       </div>
   );
}

