import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  children?: ReactNode;
};

export const Loading = ({ className, children = 'Loading...' }: Props) => {
  const { t } = useTranslation('loading');

  return (
    <div
      className={`relative z-10 flex flex-col justify-center bg-gray-300 text-center text-2xl ${className}`}
    >
      {typeof children === 'string' ? t(children) : children}
    </div>
  );
};
