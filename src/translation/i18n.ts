import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from './english.json';
import russian from './russian.json';

const resources = {
  en: {
    translation: english,
  },
  ru: {
    translation: russian,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18next;
