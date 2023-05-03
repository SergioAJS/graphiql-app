import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IFormValues } from 'models/IFormValues';
import { Button } from 'components/Button/Button';
import { TextInputForm } from 'components/TextInputForm/TextInputForm';
import { CustomLink } from 'components/CustomLink/CustomLink';
import { signUpValidationSchema } from 'utils/signUpValidationSchema';
import { createAuthUserWithEmailAndPass, createUserDocFromAuth } from 'utils/firebase';

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormValues>({
    resolver: yupResolver(signUpValidationSchema),
  });
  //TODO: email and password strength - minimum 8 symbols, at least one letter, one digit, one special character
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
      <div className="relative flex h-full w-full grow flex-wrap items-center justify-center">
        <img
          className="absolute h-full w-full justify-self-end object-cover"
          src="/images/form.webp"
          alt="form_background"
        />
        <div className="w-1/2"></div>
        <div className="relative mx-auto my-7 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center">
            <h2 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <CustomLink
                class="font-medium text-blue-600 decoration-2 hover:underline"
                to="/signin"
              >
                {' Sign in here'}
              </CustomLink>
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
      </div>
    </>
  );
};

export default SignUpForm;
