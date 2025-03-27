import * as Yup from 'yup';
import {Dictionary} from '@/shared/types/i18n';

const email = (t: Dictionary) => Yup.string().email(t('FieldError.invalidEmail')).required(t('FieldError.required'));
const password = (t: Dictionary) => Yup.string()
    .min(3, t('FieldError.minLength', {
       minLength: 3,
    }))
    .required(t('FieldError.required'));

export const SCHEMAS = (t: Dictionary) => ({
   email: email(t),
   password: password(t),
   sendFriendInvitation: Yup.object({
      email: email(t),
   }),
   sendMessage: Yup.object({
      message: Yup.string()
          .min(1, t('FieldError.minLength', {
             minLength: 1,
          }))
          .max(500, t('FieldError.maxLength', {
             maxLength: 500,
          }))
          .required(t('FieldError.required')),
   }),
   register: Yup.object({
      username: Yup.string()
          .min(3, t('FieldError.minLength', {
             minLength: 3,
          }))
          .max(20, t('FieldError.maxLength', {
             maxLength: 20,
          }))
          .required(t('FieldError.required')),
      email: email(t),
      password: password(t),
   }),
   login: Yup.object({
      email: email(t),
      password: password(t)
   }),
   generateMessage: Yup.object({
      messageLimit: Yup.number()
          .min(0, t('FieldError.min', {min: 0}))
          .max(50, t('FieldError.max', {max: 50})),
      instructions: Yup.string(),
      generatedMessage: Yup.string(),
   }),
   forgotPassword: Yup.object({
      email: Yup.string().email(t('FieldError.invalidEmail')).required(t('FieldError.required')),
   }),
   resetPassword: Yup.object({
      password: password(t),
      confirmPassword: Yup
          .string()
          .oneOf([Yup.ref('password')], t('FieldError.passwordsMatch'))
          .required(t('FieldError.required')),
   }),
} satisfies Record<string, Yup.Schema>);
