import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IFormValues } from 'models/IFormValues';
import { TextInputForm } from 'components/TextInputForm/TextInputForm';
import { Button } from 'components/Button/Button';
import { CustomLink } from 'components/CustomLink/CustomLink';
import { signInValidationSchema } from 'utils/signInValidationSchema';
import { signInAuthUserWithEmailAndPass } from 'utils/firebase';
import { useNavigate } from 'react-router-dom';
import Container from 'components/Container/Container';

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<IFormValues>({ resolver: yupResolver(signInValidationSchema) });

  const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    try {
      await signInAuthUserWithEmailAndPass(data.Email, data.Password);
      navigate('/graphiql');
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
      <div
        className="flex-grow bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(/images/welcome2.webp)` }}
      >
        <Container>
          {' '}
          <div>
            <div className="relative mx-auto my-5 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account yet?
                  <CustomLink
                    class="font-medium text-blue-600 decoration-2 hover:underline"
                    to="/signup"
                  >
                    {' Sign up here'}
                  </CustomLink>
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
                <Button type="submit">Sign In</Button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignInForm;
