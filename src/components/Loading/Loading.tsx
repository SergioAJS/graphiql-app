import { ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
};

export const Loading = ({ className, children = 'Loading...' }: Props) => (
  <div
    className={`text-2xl relative z-10 flex flex-col justify-center bg-gray-300 text-center ${className}`}
  >
    {children}
  </div>
);
