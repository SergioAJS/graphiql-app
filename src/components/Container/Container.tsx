import { PropsWithChildren } from 'react';

export type Props = {
  className?: string;
};

const Container = ({ className = '', children }: PropsWithChildren<Props>) => (
  <div
    className={`container mx-auto flex min-h-[65vh] flex-col items-center justify-between ${className}`}
  >
    {children}
  </div>
);

export default Container;
