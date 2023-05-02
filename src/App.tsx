import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { GraphiqlPage } from './pages/GraphiqlPage/GraphiqlPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { Layout } from './components/Layout/Layout';
import SignUpForm from './components/SignUpForm/SignUpForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="graphiql" element={<GraphiqlPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
