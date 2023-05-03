import { CustomLink } from 'components/CustomLink/CustomLink';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { useState } from 'react';
import { Language } from 'models/Language';
import { enumToArray } from 'utils/enumToArray';

export const Header = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setCurrentLang] = useState(Language.en);
  const languageList = enumToArray(Language);

  const langHoverHandler = () => {
    setLangOpen((prev) => !prev);
  };

  const onLangChoose = (language: Language) => {
    setCurrentLang(language);
    setLangOpen(false);
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
        <div className="text-center">
          <li
            className="relative z-10 flex cursor-pointer flex-col items-center justify-center p-2 duration-300 hover:bg-blue-200"
            onMouseEnter={langHoverHandler}
            onMouseLeave={langHoverHandler}
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
        </div>
      </div>
    </header>
  );
};
