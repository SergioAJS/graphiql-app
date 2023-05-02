import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValues } from 'models/IFormValues';
import { validationSchema } from 'utils/formValidationSchema';
import { TextInput } from 'components/TextInputForm/TextInputForm';

const SignUpForm = () => {
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
