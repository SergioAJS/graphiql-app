import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import SignUpForm from 'pages/SignUpPage/SignUpForm';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import SignInForm from 'pages/SignInPage/SignInForm';
import { UserContext } from 'utils/userContext';
import { ReactNode, Suspense, lazy, useContext } from 'react';

type Props = {
  children?: ReactNode;
  redirectPath?: string;
  isAllowed?: boolean;
};

const GraphiqlPage = lazy(() => import('pages/GraphiqlPage/GraphiqlPage'));

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
                <Suspense>
                  <GraphiqlPage />
                </Suspense>
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
