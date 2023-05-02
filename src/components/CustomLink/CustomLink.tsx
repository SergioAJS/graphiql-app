import { PropsWithChildren } from 'react';
import { Link, useMatch } from 'react-router-dom';

interface ICustomLinkProps extends PropsWithChildren {
  to: string;
  class?: string;
}

export const CustomLink = (props: ICustomLinkProps) => {
  const match = useMatch(props.to);

  return (
    <Link to={props.to} className={match ? 'text-blue-700' : props.class}>
      {props.children}
    </Link>
  );
};
