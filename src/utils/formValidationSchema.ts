import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  Name: Yup.string()
    .required('Name is required')
    .min(4, 'Name must be at least 4 characters')
    .max(20, 'Name must not exceed 20 characters'),
  'Last Name': Yup.string().optional().max(20, 'Name must not exceed 20 characters'),
  Email: Yup.string().required('Email is required').email('Email is invalid'),
  Password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  'Repeat Password': Yup.string().required('Confirm Password is required'),
});
