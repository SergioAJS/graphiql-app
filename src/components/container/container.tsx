import { PropsWithChildren } from 'react';

export type Props = {
  className?: string;
};

const Container = ({ className = '', children }: PropsWithChildren<Props>) => (
  <div
    className={`container mx-auto flex min-h-screen flex-col items-center justify-between ${className}`}
  >
    {children}
  </div>
);

export default Container;
