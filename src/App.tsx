import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import SignUpForm from 'pages/SignUpPage/SignUpForm';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import SignInForm from 'pages/SignInPage/SignInForm';
import { ReactNode, Suspense, lazy, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { onAuthStateChangeListener } from 'utils/firebase';
import { User } from 'firebase/auth';
import { login, logout, setLoading } from 'redux/userSlice';
import { Loading } from 'components/Loading/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/ErrorFallback/ErrorFallback';

type Props = {
  children?: ReactNode;
  redirectPath?: string;
  isAllowed?: boolean | null;
};

const GraphiqlPage = lazy(() => import('pages/GraphiqlPage/GraphiqlPage'));

function App() {
  const { isUserAuth, isUserLoading } = useAppSelector((state) => state.user.userAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChangeListener(async (user: User | null) => {
      if (user) {
        dispatch(login(true));
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ProtectedRoute = ({ redirectPath = '/', children, isAllowed = true }: Props) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} />;
    }
    return children ? <>{children}</> : <Outlet />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isUserLoading ? <Loading className="h-full w-full grow" /> : <Layout />}
        >
          <Route index element={<WelcomePage />} />
          <Route
            path="graphiql"
            element={
              <ProtectedRoute isAllowed={isUserAuth}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense>
                    <GraphiqlPage />
                  </Suspense>
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route element={<ProtectedRoute redirectPath={'/graphiql'} isAllowed={!isUserAuth} />}>
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
