import Container from './components/container/container';
import SignUpForm from './components/sign-up-form/sign-up-form';
import SignInForm from './components/sign-in-form/sign-in-form';

function App() {
  return (
    <Container>
      <SignUpForm />
      <SignInForm />
    </Container>
  );
}

export default App;
