import { ComponentProps, PropsWithChildren } from 'react';

export type Props = {
  className?: string;
  'data-testId'?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  containerProps?: ComponentProps<'div'>;
  onClick?: () => void;
};

export const Button = ({
  children,
  className = '',
  onClick,
  type = 'button',
}: PropsWithChildren<Props>) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
      ${className}`}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);
