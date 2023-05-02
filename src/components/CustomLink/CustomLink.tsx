import { PropsWithChildren } from 'react';
import { Link, useMatch } from 'react-router-dom';

interface CustomLinkProps extends PropsWithChildren {
  to: string;
}

export const CustomLink = (props: CustomLinkProps) => {
  const match = useMatch(props.to);

  return (
    <Link to={props.to} className={match ? 'text-yellow-500' : ''}>
      {props.children}
    </Link>
  );
};
