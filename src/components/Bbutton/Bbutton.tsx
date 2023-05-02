import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const Button = ({
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75
    dark:focus:ring-offset-gray-800 ${className}`}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
);
