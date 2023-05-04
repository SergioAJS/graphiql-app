import { PropsWithChildren } from 'react';

export type Props = {
  className?: string;
  style?: React.CSSProperties;
};

const Container = ({ className = '', children, style }: PropsWithChildren<Props>) => (
  <div className={`container mx-auto px-10 ${className}`} style={style}>
    {children}
  </div>
);

export default Container;
