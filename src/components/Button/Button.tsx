import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const Button = ({
  color = 'blue',
  children,
  disabled,
  onClick,
  type = 'button',
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-${color}-500
      px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-${color}-600 focus:outline-none focus:ring-2
      focus:ring-${color}-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
