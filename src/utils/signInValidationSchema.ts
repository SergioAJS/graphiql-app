import * as Yup from 'yup';

export const signInValidationSchema = Yup.object().shape({
  Email: Yup.string().required('Email is required').email('Email is invalid'),
  Password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must not exceed 20 characters'),
  /*.matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d{1,}/, 'Password must contain at least one number')
    .matches(/[`!@%$&^*(){}[]|\\,.]+/, 'Password must contain at least one special character') */
});
