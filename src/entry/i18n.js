import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

export const supportedLanguages = ['en', 'he'];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'he',
    language: 'he',
    fallbackLng: 'he',
    ns: ['translation'],
    defaultNS: 'translation',
    debug: true,
    whitelist: supportedLanguages,
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
        wait: true,
        useSuspense: true,
    },
  });

export default i18n;
