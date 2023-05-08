import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';

export const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
