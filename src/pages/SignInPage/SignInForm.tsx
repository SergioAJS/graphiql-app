import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IFormValues } from 'models/IFormValues';
import { TextInputForm } from 'components/TextInputForm/TextInputForm';
import { Button } from 'components/Button/Button';
import { CustomLink } from 'components/CustomLink/CustomLink';
import { signInValidationSchema } from 'utils/signInValidationSchema';
import { signInAuthUserWithEmailAndPass } from 'utils/firebase';
import Container from 'components/Container/Container';
import { useTranslation } from 'react-i18next';

const SignInForm = () => {
  const { t } = useTranslation('signInForm');

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<IFormValues>({ resolver: yupResolver(signInValidationSchema) });

  const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    try {
      await signInAuthUserWithEmailAndPass(data.Email, data.Password);
    } catch (error: unknown) {
      const message = error instanceof Error && error.code;
      switch (message) {
        case 'auth/wrong-password':
          setError('Password', {
            message: t('Wrong password') || 'Wrong password',
          });
          break;
        case 'auth/user-not-found':
          setError('Email', {
            message: t('User not found') || 'User not found',
          });
          break;
        case 'auth/too-many-requests':
          setError('Email', {
            message: t('Too many requests') || 'Too many requests',
          });
          setError('Password', {
            message: t('Too many requests') || 'Too many requests',
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
        className="flex-grow bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/signin.webp)` }}
      >
        <Container>
          {' '}
          <div>
            <div className="relative mx-auto mb-5 mt-[12vh] w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  {t('Sign in')}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {t('Dont have an account yet')}?
                  <CustomLink
                    class="font-medium text-blue-600 decoration-2 hover:underline"
                    to="/signup"
                  >
                    {t('Sign up here')}
                  </CustomLink>
                </p>
              </div>
              <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                {t('Or')}
              </div>
              <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                <TextInputForm
                  type="email"
                  label={t('Email')}
                  register={register}
                  errors={errors}
                  placeholder="you@example.com"
                />
                <TextInputForm
                  type="password"
                  label={t('Password')}
                  register={register}
                  errors={errors}
                  placeholder={t('Type password') || 'Type password'}
                />
                <Button type="submit">{t('Sign in')}</Button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignInForm;
