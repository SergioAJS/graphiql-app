import { CustomLink } from '../CustomLink/CustomLink';

export const Header = () => {
  return (
    <header className="flex w-full justify-between gap-3 border-b-2 bg-gray-100 p-4">
      <div className="w-2/3">Logo</div>
      <div className="text-center">
        <CustomLink to="/">Welcome</CustomLink>
      </div>
      <div className="text-center">
        <CustomLink to="/graphiql">GraphiQL</CustomLink>
      </div>
      <div className="text-center">
        <CustomLink to="/auth">Auth</CustomLink>
      </div>
      <div className="text-center">
        <CustomLink to="/signup">SignUp</CustomLink>
      </div>
      <div className="text-center">Lang</div>
    </header>
  );
};
