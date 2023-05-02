import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { TextInputForm } from '../text-input-form/text-input-form';
import { Button } from '../button/button';
import { createAuthUserWithEmailAndPass, createUserDocFromAuth } from '../../utils/firebase';

export interface IFormValues {
  Name: string;
  Email: string;
  'Last Name': string;
  Password: string;
  'Repeat Password': string;
}

const SignUpForm = () => {
  const validationSchema = Yup.object().shape({
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
    /*.matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/\d{1,}/, 'Password must contain at least one number')
      .matches(/[`!@%$&^*(){}[]|\\,.]+/, 'Password must contain at least one special character') */
    'Repeat Password': Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('Password')], 'Confirm Password does not match'),
  });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<IFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    try {
      const response = await createAuthUserWithEmailAndPass(data.Email, data.Password);
      const user = response?.user;
      if (user) {
        const result = await createUserDocFromAuth(user, {
          displayName: data.Name,
          lastName: data['Last Name'],
        });
        console.log(result);
      }
    } catch (error: unknown) {
      const message = error instanceof Error && error.code;
      if (message) {
        setError('Email', {
          message: message,
        });
      }
      console.log('Create user encountered an error', error);
    }
  };

  return (
    <>
      <div className="mx-auto mt-7 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <a className="font-medium text-blue-600 decoration-2 hover:underline" href="#!">
              {' Sign in here'}
            </a>
          </p>
        </div>
        <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
          Or
        </div>
        <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInputForm
            type="text"
            label="Name"
            register={register}
            errors={errors}
            placeholder="Type your name"
          />
          <TextInputForm
            type="text"
            label="Last Name"
            register={register}
            errors={errors}
            placeholder="Type your last name"
            required={false}
          />
          <TextInputForm
            type="email"
            label="Email"
            register={register}
            errors={errors}
            placeholder="you@example.com"
          />
          <TextInputForm
            type="password"
            label="Password"
            register={register}
            errors={errors}
            placeholder="Create strong password"
          />
          <TextInputForm
            type="password"
            label="Repeat Password"
            register={register}
            errors={errors}
            placeholder="Repeat password"
          />
          <Button type="submit">Sign up</Button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
