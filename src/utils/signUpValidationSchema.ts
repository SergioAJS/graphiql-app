import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  Name: Yup.string()
    .required('Name is required')
    .min(4, 'Name must be at least 4 characters')
    .max(20, 'Name must not exceed 20 characters'),
  'Last Name': Yup.string().optional().max(20, 'Name must not exceed 20 characters'),
  //TODO: email and password strength - minimum 8 symbols, at least one letter, one digit, one special character
  Email: Yup.string().required('Email is required').email('Email is invalid'),
  Password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  /*.matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d{1,}/, 'Password must contain at least one number')
    .matches(/[`!@%$&^*(){}[]|\\,.]+/, 'Password must contain at least one special character') */
  'Repeat Password': Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('Password')], 'Confirm Password does not match'),
});
