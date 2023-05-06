import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import headerEn from './english/header.json';
import notFoundPageEn from './english/notFoundPage.json';
import signInFormEn from './english/signInForm.json';
import signUpFormEn from './english/signUpForm.json';
import textInputFormEn from './english/textInputForm.json';

import headerRu from './russian/header.json';
import notFoundPageRu from './russian/notFoundPage.json';
import signInFormRu from './russian/signInForm.json';
import signUpFormRu from './russian/signUpForm.json';
import textInputFormRu from './russian/textInputForm.json';

const resources = {
  en: {
    header: headerEn,
    notFoundPage: notFoundPageEn,
    signInForm: signInFormEn,
    signUpForm: signUpFormEn,
    textInputForm: textInputFormEn,
  },
  ru: {
    header: headerRu,
    notFoundPage: notFoundPageRu,
    signInForm: signInFormRu,
    signUpForm: signUpFormRu,
    textInputForm: textInputFormRu,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18next;
