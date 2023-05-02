import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { TextInputForm } from '../text-input-form/text-input-form';
import { IFormValues } from 'models/IFormValues';
import { signInAuthUserWithEmailAndPass } from '../../utils/firebase';
import { Button } from 'components/Button/button';

const SignInForm = () => {
  const validationSchema = Yup.object().shape({
    Email: Yup.string().required('Email is required').email('Email is invalid'),
    Password: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 4 characters')
      .max(20, 'Password must not exceed 20 characters'),
    /*.matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/\d{1,}/, 'Password must contain at least one number')
      .matches(/[`!@%$&^*(){}[]|\\,.]+/, 'Password must contain at least one special character') */
  });

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<IFormValues>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    try {
      const result = await signInAuthUserWithEmailAndPass(data.Email, data.Password);
      console.log(result);
    } catch (error: unknown) {
      const message = error instanceof Error && error.code;
      switch (message) {
        case 'auth/wrong-password':
          setError('Password', {
            message: 'Wrong password',
          });
          break;
        case 'auth/user-not-found':
          setError('Email', {
            message: 'User not found',
          });
          break;
        case 'auth/too-many-requests':
          setError('Email', {
            message: 'Too many requests',
          });
          setError('Password', {
            message: 'Too many requests',
          });
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <>
      <div className="mx-auto mt-7 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account yet?
            <a className="font-medium text-blue-600 decoration-2 hover:underline" href="#!">
              {' Sign up here'}
            </a>
          </p>
        </div>
        <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
          Or
        </div>
        <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="Type password"
          />
          <Button type="submit">Sign up</Button>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
