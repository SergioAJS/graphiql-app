import * as Yup from 'yup';

export const signInValidationSchema = Yup.object().shape({
  Email: Yup.string().required('Email is required').email('Email is invalid'),
  Password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters'),
});
