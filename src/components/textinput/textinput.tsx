import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../sign-up-form/sign-up-form';

type InputProps = {
  type: string;
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  required?: boolean;
};

export const TextInput = ({ type, label, register, required, errors }: InputProps) => {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']">
        {label}
      </span>
      <input
        type={type}
        {...register(label, { required })}
        className={`mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm
          ${
            errors[label] &&
            'border-pink-500 text-pink-600  focus:border-pink-500 focus:ring-pink-500'
          }`}
        placeholder="you@example.com"
      />
      {errors[label] && <p className="mt-2 text-sm text-pink-600">{errors[label]?.message}</p>}
    </label>
  );
};
