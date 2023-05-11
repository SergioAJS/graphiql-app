import Container from 'components/Container/Container';
import { DocExplorer } from 'components/DocExplorer/DocExplorer';

export const WelcomePage = () => {
  return (
    <div
      className="flex-grow bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/images/welcome.webp)` }}
    >
      <Container>
        <div className="relative flex h-full w-full grow justify-center">
          <img
            className="absolute h-full w-full object-cover opacity-90"
            src="/images/welcome.webp"
            alt="background_image"
          />
          <div className="absolute mt-[10vh] p-8">
            fdasfds
            <DocExplorer />
          </div>
        </div>
      </Container>
    </div>
  );
};
