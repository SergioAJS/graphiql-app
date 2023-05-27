import { Button } from 'components/Button/Button';
import Container from 'components/Container/Container';
import { TeamCard } from 'components/TeamCard/TeamCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAppSelector } from 'redux/hooks';

export const WelcomePage = () => {
  const { isUserAuth } = useAppSelector((state) => state.user.userAuth);
  const navigate = useNavigate();
  const { t } = useTranslation('welcome');

  return (
    <div
      className="flex-grow bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/images/welcome.webp)` }}
    >
      <Container>
        <div className="relative mt-16 flex h-full w-full grow flex-col justify-center">
          <div className="mx-auto py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="rounded-xl border border-gray-200 bg-white p-4 opacity-90 shadow-md dark:border-gray-700 dark:bg-slate-900 md:grid-cols-2 md:items-center md:gap-8 md:p-6 xl:gap-20">
              <h1 className="block text-xl font-bold dark:text-white sm:text-2xl lg:text-4xl lg:leading-tight">
                {t('This work done as a part of')}
                <span className="text-blue-600">{t('Course')}</span>
              </h1>
              <p className="mt-3 text-lg text-gray-950 dark:text-gray-400">
                {t('Task description')}
              </p>
              <div className="mt-7 flex flex-row justify-between gap-3 sm:inline-flex">
                <a target="_blank" rel="noreferrer" href="https://app.rs.school/registry/student">
                  <Button>Enroll Course</Button>
                </a>
                {isUserAuth && (
                  <Button onClick={() => navigate('/graphiql')}>{t('Go to Main Page')}</Button>
                )}
              </div>
            </div>
            <h2 className="my-8 text-center text-2xl font-bold dark:text-white md:text-4xl md:leading-tight">
              {t('Team Members')}
            </h2>
            <div className="grid grid-cols-1 gap-6 opacity-90 sm:grid-cols-2 lg:grid-cols-3">
              {TeamList.map((item, index) => (
                <TeamCard key={index} {...item} />
              ))}
            </div>
            <p className="my-2 text-center text-gray-600 dark:text-gray-400">{t('Cite')}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

const TeamList = [
  {
    title: 'Team Leader',
    description: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image: '/images/codewars_sloths.svg',
    name: 'Sergei Aslanov',
    link: 'https://github.com/SergioAJS',
  },
  {
    title: 'FRONT-END DEVELOPER',
    description: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image: '/images/congrats_sloths.svg',
    name: 'Irina Migunova',
    link: 'https://github.com/istairina',
  },
  {
    title: 'FRONT-END DEVELOPER',
    description: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image: '/images/deadline_sloths.svg',
    name: 'Yuri Skrypal',
    link: 'https://github.com/Sepulator',
  },
];
