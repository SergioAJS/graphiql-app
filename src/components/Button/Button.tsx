import { cx } from 'classix';

type Props = {
  children?: React.ReactNode;
  type?: 'submit' | 'button';
  className?: string;
  pill?: boolean;
  disabled?: boolean;
  transform?: boolean;
  variant?: 'primary' | 'secondary' | 'inform';
  size?: 'small' | 'normal' | 'large';
  onClick?: () => void;
};

const classes = {
  base: 'inline-flex items-center justify-center gap-2 rounded-md border border-transparent font-semibold transition-all',
  disabled: 'opacity-50 cursor-not-allowed',
  pill: 'rounded-full',
  transform: 'uppercase',
  size: {
    small: 'py-2 px-3 text-sm',
    normal: 'px-4 py-3 text-sm',
    large: 'px-8 py-3 text-sm sm:p-5',
  },
  variant: {
    primary:
      'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
    secondary:
      'bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
    inform:
      'bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
  },
};

export const Button = ({
  children,
  disabled = false,
  transform = false,
  className,
  onClick,
  pill = false,
  variant = 'primary',
  size = 'normal',
  type = 'button',
  ...props
}: Props) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={cx(
      classes.base,
      classes.size[size],
      classes.variant[variant],
      pill && classes.pill,
      disabled && classes.disabled,
      transform && classes.transform,
      className
    )}
    {...props}
  >
    {children}
  </button>
);
