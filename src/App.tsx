import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import SignUpForm from 'pages/SignUpPage/SignUpForm';
import { GraphiqlPage } from 'pages/GraphiqlPage/GraphiqlPage';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import SignInForm from 'pages/SignInPage/SignInForm';
import { UserContext } from 'utils/userContext';
import { ReactNode, useContext } from 'react';

type Props = {
  children?: ReactNode;
  redirectPath?: string;
  isAllowed?: boolean;
};

function App() {
  const { user } = useContext(UserContext);

  const ProtectedRoute = ({ redirectPath = '/', children, isAllowed = true }: Props) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} />;
    }
    return children ? <>{children}</> : <Outlet />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route
            path="graphiql"
            element={
              <ProtectedRoute isAllowed={user ? true : false}>
                <GraphiqlPage />
              </ProtectedRoute>
            }
          />
          <Route element={<ProtectedRoute redirectPath={'/graphiql'} isAllowed={!user} />}>
            <Route path="signin" element={<SignInForm />} />
            <Route path="signup" element={<SignUpForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
