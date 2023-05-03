import { CustomLink } from 'components/CustomLink/CustomLink';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { UserContext } from 'utils/userContext';
import { useContext } from 'react';
import { Button } from 'components/Button/Button';
import { signOutUser } from 'utils/firebase';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    signOutUser();
    navigate('/');
  };

  return (
    <header className="flex w-full items-center justify-between gap-5 border-b-2 bg-white px-10 py-6 font-semibold">
      <div className="flex items-end justify-center gap-1 font-medium">
        <CustomLink to="/">
          <Logo />
        </CustomLink>
        <p className="mb-1 select-none text-lg">Catalysis Hub</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="text-center">
          <CustomLink class="transition-colors duration-300 hover:text-blue-500" to="/">
            Welcome
          </CustomLink>
        </div>
        <div className="text-center">
          <CustomLink class="transition-colors duration-300 hover:text-blue-500" to="/graphiql">
            GraphiQL
          </CustomLink>
        </div>
        {user ? (
          <Button onClick={signOut}>Sign Out</Button>
        ) : (
          <>
            <div className="text-center">
              <CustomLink to="/signin">
                <button className="header-button">Sign In</button>
              </CustomLink>
            </div>
            <div className="text-center">
              <CustomLink to="/signup">
                <button className="header-button">Sign Up</button>
              </CustomLink>
            </div>
          </>
        )}
        <div className="text-center">Lang</div>
      </div>
    </header>
  );
};
