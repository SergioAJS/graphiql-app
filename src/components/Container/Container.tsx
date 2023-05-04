import { PropsWithChildren } from 'react';

export type Props = {
  className?: string;
  style?: React.CSSProperties;
};

const Container = ({ className = '', children, style }: PropsWithChildren<Props>) => (
  <div className={`container mx-auto ${className}`} style={style}>
    {children}
  </div>
);

export default Container;
