import { Routes, Route } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import SignUpForm from 'pages/SignUpPage/SignUpForm';
import { GraphiqlPage } from 'pages/GraphiqlPage/GraphiqlPage';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="graphiql" element={<GraphiqlPage />} />
          <Route path="signin" element={<SignInForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
