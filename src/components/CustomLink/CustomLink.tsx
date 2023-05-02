import { PropsWithChildren } from 'react';
import { Link, useMatch } from 'react-router-dom';

interface ICustomLinkProps extends PropsWithChildren {
  to: string;
}

export const CustomLink = (props: ICustomLinkProps) => {
  const match = useMatch(props.to);

  return (
    <Link to={props.to} className={match ? 'text-yellow-500' : ''}>
      {props.children}
    </Link>
  );
};
