import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  Name: Yup.string()
    .required('Name is required')
    .min(4, 'Name must be at least 4 characters')
    .max(20, 'Name must not exceed 20 characters'),
  'Last Name': Yup.string().optional().max(20, 'Last name must not exceed 20 characters'),
  Email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .min(8, 'Email must be at least 8 characters')
    .max(20, 'Email must not exceed 20 characters'),
  Password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d{1,}/, 'Password must contain at least one number')
    .matches(
      /(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])/,
      'Password must contain at least one special character'
    ),
  'Repeat Password': Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('Password')], 'Confirm Password does not match'),
});
