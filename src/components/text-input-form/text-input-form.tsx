import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../sign-up-form/sign-up-form';

type InputProps = {
  type: string;
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  'data-testid'?: string;
  placeholder?: string;
  required?: boolean;
};

export const TextInput = ({
  type,
  label,
  register,
  required = true,
  placeholder,
  errors,
}: InputProps) => {
  return (
    <label className="block">
      <span
        className={`block text-sm font-medium after:ml-0.5 ${
          required && "after:text-red-500 after:content-['*']"
        }`}
      >
        {`${required ? label : label + ' (optional)'}`}
      </span>
      <input
        type={type}
        {...register(label, { required })}
        className={`mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-base
          ${
            errors.root &&
            'border-pink-500 text-pink-600  focus:border-pink-500 focus:ring-pink-500'
          }`}
        placeholder={placeholder}
      />
      {errors.root && <p className="mt-2 text-sm text-pink-600">{errors.root?.message}</p>}
    </label>
  );
};
