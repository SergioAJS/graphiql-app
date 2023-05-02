import { CustomLink } from 'components/CustomLink/CustomLink';
import Container from 'components/containerr/containerr';

export const Header = () => {
  return (
    <header className="border-b-2 bg-gray-100 p-4">
      <Container>
        <div className="flex w-full justify-between gap-3">
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
        </div>
      </Container>
    </header>
  );
};
