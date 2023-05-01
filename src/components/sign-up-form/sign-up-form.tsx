import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { TextInput } from '../text-input-form/text-input-form';

export interface IFormValues {
  Email: string;
  Name: string;
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
    'Repeat Password': Yup.string().required('Confirm Password is required'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormValues>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => {
    console.log(data);
  };

  return (
    <>
      <form className="mx-auto flex w-96 flex-col space-y-4 pt-8" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          label="Name"
          register={register}
          errors={errors}
          placeholder="Type your name"
        />
        <TextInput
          type="text"
          label="Last Name"
          register={register}
          errors={errors}
          placeholder="Type your last name"
          required={false}
        />
        <TextInput
          type="email"
          label="Email"
          register={register}
          errors={errors}
          placeholder="you@example.com"
        />
        <TextInput
          type="password"
          label="Password"
          register={register}
          errors={errors}
          placeholder="Create strong password"
        />
        <TextInput
          type="password"
          label="Repeat Password"
          register={register}
          errors={errors}
          placeholder="Repeat password"
        />
      </form>
    </>
  );
};

export default SignUpForm;
