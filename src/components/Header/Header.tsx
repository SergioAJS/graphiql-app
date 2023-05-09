import { CustomLink } from 'components/CustomLink/CustomLink';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { useState } from 'react';
import { Language } from 'models/Language';
import { enumToArray } from 'utils/enumToArray';
import { UserContext } from 'utils/userContext';
import { useContext } from 'react';
import { signOutUser } from 'utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useScrollPosition } from 'hooks/useScrollPosition';
import Container from 'components/Container/Container';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setCurrentLang] = useState(
    (localStorage.getItem('lang') as keyof typeof Language) || Language.en
  );
  const [liClass, setLiClass] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const languageList = enumToArray(Language);
  const scrollPosition = useScrollPosition();
  const { t, i18n } = useTranslation('header');

  const langHoverHandler = () => {
    setLiClass((prev) => !prev);
    setLangOpen((prev) => !prev);
  };

  const onLangChoose = (language: Language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
    setCurrentLang(language);
    setLangOpen(false);
    setLiClass(false);
  };

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    signOutUser();
    navigate('/');
    setMenuOpen(false);
  };

  const handleBurgerMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`${
        scrollPosition < 50 ? 'bg-white/50' : 'bg-white'
      } fixed z-30 flex h-16 w-screen items-center justify-center py-2 transition-colors duration-200`}
    >
      <Container>
        <nav className="flex w-full items-center justify-between gap-5 font-semibold">
          <div className="flex items-end justify-center gap-1 font-medium">
            <CustomLink to="/" onClick={() => setMenuOpen(false)}>
              <Logo />
            </CustomLink>
            <p className="mb-1 select-none text-lg">Catalysis Hub</p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div className="hidden items-center gap-5 md:flex" aria-label="main">
              <div className="text-center">
                <CustomLink class="transition-colors duration-300 hover:text-blue-500" to="/">
                  {t('Welcome')}
                </CustomLink>
              </div>
              {user ? (
                <div className="text-center">
                  <CustomLink
                    class="transition-colors duration-300 hover:text-blue-500"
                    to="/graphiql"
                  >
                    GraphiQL
                  </CustomLink>
                </div>
              ) : (
                <></>
              )}
              {user ? (
                <button className="header-button" onClick={signOut}>
                  {t('Sign Out')}
                </button>
              ) : (
                <>
                  <div className="text-center">
                    <CustomLink to="/signin">
                      <button className="header-button">{t('Sign In')}</button>
                    </CustomLink>
                  </div>
                  <div className="text-center">
                    <CustomLink to="/signup">
                      <button className="header-button">{t('Sign Up')}</button>
                    </CustomLink>
                  </div>
                </>
              )}
            </div>
            <div
              className="flex cursor-pointer items-center justify-center justify-self-end text-center"
              onMouseEnter={langHoverHandler}
              onMouseLeave={langHoverHandler}
            >
              <li
                className={`relative z-20 flex w-10 cursor-pointer flex-col items-center justify-center p-2 ${
                  liClass ? 'bg-blue-200' : ''
                }`}
              >
                <p>{Language[lang].toUpperCase()}</p>
                <ul className="absolute top-full w-full bg-blue-500 text-white">
                  {langOpen &&
                    languageList.map((langCode, index) => (
                      <li key={index}>
                        <div
                          onClick={() => onLangChoose(langCode)}
                          onKeyDown={() => onLangChoose(langCode)}
                          role="button"
                          tabIndex={0}
                          className={
                            lang === Language[langCode]
                              ? 'pointer-events-none bg-gray-500 p-2 text-white duration-300'
                              : 'p-2 duration-300 hover:bg-blue-600'
                          }
                        >
                          {Language[langCode].toUpperCase()}
                        </div>
                      </li>
                    ))}
                </ul>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <button className="relative h-8 w-8 md:hidden" onClick={handleBurgerMenu}>
              <div
                className={`${
                  menuOpen ? 'toggle-btn' : 'before:-translate-y-2 after:translate-y-2'
                } absolute h-0.5 w-6 rounded bg-gray-700 transition-all duration-300 before:absolute before:h-0.5 before:w-6 before:-translate-x-3 before:rounded before:bg-gray-700 before:transition-all before:duration-300 before:content-[""] after:absolute after:h-0.5 after:w-6 after:-translate-x-3  after:rounded after:bg-gray-700 after:transition-all after:duration-300 after:content-[""]`}
              ></div>
            </button>
          </div>
        </nav>
      </Container>

      <div
        className={`${
          menuOpen ? '' : 'hidden'
        } absolute top-16 z-10 w-screen origin-top animate-open-menu bg-gradient-to-t from-white via-sky-100/95 to-sky-200`}
        onClick={() => setMenuOpen(false)}
        onKeyDown={() => setMenuOpen(false)}
        role="link"
        tabIndex={0}
      >
        <Container className="my-6 flex flex-col justify-center gap-3">
          <nav className="flex min-h-screen flex-col items-center gap-5" aria-label="mobile">
            <CustomLink
              class="transition-colors duration-300 hover:text-blue-500"
              to="/"
              onClick={handleBurgerMenu}
            >
              {t('Welcome')}
            </CustomLink>
            {user ? (
              <CustomLink
                class="transition-colors duration-300 hover:text-blue-500"
                to="/graphiql"
                onClick={handleBurgerMenu}
              >
                GraphiQL
              </CustomLink>
            ) : (
              <></>
            )}
            {user ? (
              <button className="header-button" onClick={signOut}>
                {t('Sign Out')}
              </button>
            ) : (
              <>
                <CustomLink to="/signin" onClick={handleBurgerMenu}>
                  <button className="header-button">{t('Sign In')}</button>
                </CustomLink>
                <CustomLink to="/signup" onClick={handleBurgerMenu}>
                  <button className="header-button">{t('Sign Up')}</button>
                </CustomLink>
              </>
            )}
          </nav>
        </Container>
      </div>
    </header>
  );
};
