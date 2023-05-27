import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  children?: ReactNode;
  redirectPath?: string;
  isAllowed?: boolean | null;
};

export const ProtectedRoute = ({ redirectPath = '/', children, isAllowed = true }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }
  return children ? <>{children}</> : <Outlet />;
};
