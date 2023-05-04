import { CustomLink } from 'components/CustomLink/CustomLink';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { useState } from 'react';
import { Language } from 'models/Language';
import { enumToArray } from 'utils/enumToArray';
import { UserContext } from 'utils/userContext';
import { useContext } from 'react';
import { Button } from 'components/Button/Button';
import { signOutUser } from 'utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useScrollPosition } from 'utils/useScrollPosition';

export const Header = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setCurrentLang] = useState(Language.en);
  const [liClass, setLiClass] = useState(false);
  const languageList = enumToArray(Language);
  const scrollPosition = useScrollPosition();

  const langHoverHandler = () => {
    setLiClass((prev) => !prev);
    setLangOpen((prev) => !prev);
  };

  const onLangChoose = (language: Language) => {
    setCurrentLang(language);
    setLangOpen(false);
    setLiClass(false);
  };

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    signOutUser();
    navigate('/');
  };

  return (
    <header
      className={`${
        scrollPosition < 50 ? 'bg-white/50' : 'bg-white'
      } fixed z-10 flex min-h-[10vh] w-screen items-center justify-center transition-colors duration-200`}
    >
      <div className="container flex w-full items-center justify-between gap-5 px-10 font-semibold">
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
          <div
            className="flex cursor-pointer items-center justify-center text-center"
            onMouseEnter={langHoverHandler}
            onMouseLeave={langHoverHandler}
          >
            <li
              className={`relative z-10 flex w-10 cursor-pointer flex-col items-center justify-center p-2 ${
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};
