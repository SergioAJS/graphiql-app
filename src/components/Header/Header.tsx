import { CustomLink } from 'components/CustomLink/CustomLink';
import { ReactComponent as Logo } from 'assets/logo.svg';

export const Header = () => {
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
          <CustomLink to="/">Welcome</CustomLink>
        </div>
        <div className="text-center">
          <CustomLink to="/graphiql">GraphiQL</CustomLink>
        </div>
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
        <div className="text-center">Lang</div>
      </div>
    </header>
  );
};
