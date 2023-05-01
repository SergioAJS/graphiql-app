import { PropsWithChildren } from 'react';

export type Props = {
  className?: string;
};

const Container = ({ className = '', children }: PropsWithChildren<Props>) => (
  <div className={`container mx-auto px-4 ${className}`}>{children} </div>
);

export default Container;
