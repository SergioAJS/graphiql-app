import Container from 'components/Container/Container';
import { TeamCard } from 'components/TeamCard/TeamCard';

export const WelcomePage = () => {
  return (
    <div
      className="flex-grow bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/images/welcome.webp)` }}
    >
      <Container>
        <div className="relative mt-16 flex h-full w-full grow justify-center">
          <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
              <h2 className="text-2xl md:text-4xl font-bold dark:text-white md:leading-tight">
                Our Team Members
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                “Coming together is a beginning. Keeping together is progress. Working together is
                success.”- Henry Ford
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TeamList.map((item, index) => (
                <TeamCard key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const TeamList = [
  {
    title: 'Team Leader',
    description:
      'Team and project manager. Pages routing setup. User interface design and styling pages.',
    image: '/images/codewars_sloths.svg',
    name: 'Sergei Aslanov',
    link: 'https://github.com/Sepulator',
  },
  {
    title: 'FRONT-END DEVELOPER',
    description:
      'Created sign-up and sign-in forms, user authorization via Firebase. Set up RTK Query and Store to manage GraphQL API.',
    image: '/images/congrats_sloths.svg',
    name: 'Irina Migunova',
    link: 'https://github.com/Sepulator',
  },
  {
    title: 'FRONT-END DEVELOPER',
    description:
      'Configured i18next to manage project localization. Worked on sections of GraphQL editor.',
    image: '/images/deadline_sloths.svg',
    name: 'Yuri Skrypal',
    link: 'https://github.com/Sepulator',
  },
];
