"use client"

import {useState, useEffect, use} from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {Alert, Box, Typography} from '@mui/material';
import { CheckCircleOutline } from "@mui/icons-material"
import { useAppDispatch } from "@/store/store"
import { verifyResetToken } from "@/store/user/actions/thunks/verify-reset-token"
import { resetPassword } from "@/store/user/actions/thunks/reset-password"
import { SCHEMAS } from "@/validation/schemas"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import PageSizedForm from "@/shared/ui/PageSizedForm"
import FormHeader from "@/shared/ui/FormHeader"
import Input from "@/shared/ui/Input"
import PrimaryButton from "@/shared/ui/PrimaryButton"
import Redirect from "@/code/features/auth/components/redirect"
import HeroImage from "@/shared/ui/HeroImage"

type ResetPasswordFormData = {
   password: string
   confirmPassword: string
}

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isVerifying, setIsVerifying] = useState(true)
   const [isVerified, setIsVerified] = useState(false)
   const [isCompleted, setIsCompleted] = useState(false)
   
   const dispatch = useAppDispatch()
   const router = useRouter()
   const t = useTranslations()
   const { token } = use(params)
   
   const { control, handleSubmit } = useForm<ResetPasswordFormData>({
      resolver: yupResolver(SCHEMAS(t).resetPassword),
   })
   
   useEffect(() => {
      const verifyToken = async () => {
         try {
            setIsVerifying(true)
            await dispatch(verifyResetToken({ token })).unwrap()
            setIsVerified(true)
         } catch (error: any) {
            setIsVerified(false)
         } finally {
            setIsVerifying(false)
         }
      }
      
      verifyToken()
   }, [token])
   
   const onSubmit = async (data: ResetPasswordFormData) => {
      setIsSubmitting(true)
      try {
         await dispatch(
             resetPassword({
                token,
                password: data.password,
             }),
         ).unwrap()
         
         setIsCompleted(true)
         
         setTimeout(() => {
            router.push("/login")
         }, 3000)
      } finally {
         setIsSubmitting(false)
      }
   }
   
   const renderContent = () => {
      if (isVerifying) {
         return (
             <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4 }}>
                <Typography variant="body1" sx={{ mt: 2 }}>
                   {t("Pages.ResetPassword.verifying")}
                </Typography>
             </Box>
         )
      }
      
      if (!isVerified) {
         return (
             <Box sx={{ textAlign: "center" }}>
                <Alert severity="error" className="mb-8">
                   {t("Pages.ResetPassword.invalidTokenDescription")}
                </Alert>
                <PrimaryButton onClick={() => router.push("/login")}>
                   {t("Pages.ResetPassword.backToLogin")}
                </PrimaryButton>
             </Box>
         )
      }
      
      if (isCompleted) {
         return (
             <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Box
                    sx={{
                       backgroundColor: "success.light",
                       borderRadius: "50%",
                       p: 1.5,
                       mb: 2,
                    }}
                >
                   <CheckCircleOutline fontSize="large" stroke="forestgreen" />
                </Box>
                <Typography component="h1" variant="h5" gutterBottom>
                   {t("Pages.ResetPassword.successTitle")}
                </Typography>
                <Typography variant="body1" paragraph>
                   {t("Pages.ResetPassword.successDescription")}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                   {t("Pages.ResetPassword.redirecting")}
                </Typography>
             </Box>
         )
      }
      
      return (
          <>
             <FormHeader title={t("Pages.ResetPassword.title")} description={t("Pages.ResetPassword.description")} />
             <form onSubmit={handleSubmit(onSubmit)} className="flex-col mb-4 flex gap-2 mt-3">
                <Input type="password" name="password" label={t("Common.newPassword")} control={control} />
                <Input type="password" name="confirmPassword" label={t("Common.confirmPassword")} control={control} />
                <PrimaryButton className="mt-2" disabled={isSubmitting} type="submit">
                   {t("Pages.ResetPassword.submit")}
                </PrimaryButton>
             </form>
             <Redirect href="/login" description={t("Pages.ForgotPassword.rememberPassword")}>
                {t("Pages.ResetPassword.backToLogin")}
             </Redirect>
          </>
      )
   }
   
   return (
       <div>
          <PageSizedForm>{renderContent()}</PageSizedForm>
          <HeroImage
              outerWrapperClassName="bottom-0 left-0"
              innerWrapperClassName="lg:h-[60vh] h-[75vh]"
              imageProps={{
                 src: "https://resume-io-helpscout.s3.amazonaws.com/1644317987059/assets/hero-image.svg",
                 alt: "bg",
              }}
          />
       </div>
   )
}
