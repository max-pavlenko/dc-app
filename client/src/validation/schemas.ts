import * as Yup from "yup";

export const YupObject = Yup.object();
export const emailSchema = Yup.string().email('Invalid email').required('Email is required');

export const passwordSchema = Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .required('Password is required');

export const registerValidationSchema = YupObject.shape({
    username: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(20, 'Name cannot exceed 20 characters')
        .required('Name is required'),
    email: emailSchema,
    password: passwordSchema,
});

export const loginValidationSchema = YupObject.shape({
    email: emailSchema,
    password: passwordSchema,
});
