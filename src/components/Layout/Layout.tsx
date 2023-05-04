import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import Container from 'components/Container/Container';

export const Layout = () => {
  return (
    <>
      <Header />
      <div
        className="flex-grow bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(/images/welcome2.webp)` }}
      >
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </>
  );
};
