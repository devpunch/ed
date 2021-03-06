import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { CountriesEnum } from './src/enums/CountriesEnum';
import en from './src/locales/en/Web_English.json';

const resources = {
  [CountriesEnum.EN]: {
    translation: en,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: CountriesEnum.EN,
    keySeparator: false, // we do not use keys in form messages.welcome
    nsSeparator: false,
    appendNamespaceToMissingKey: false,
    supportedLngs: [
      CountriesEnum.EN,
    ],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
