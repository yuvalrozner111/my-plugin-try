import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { pluginResources } from './plugin-translations.js';
import { plugins } from '/src/plugin-host/plugin-loader.js';

export const supportedLanguages = ['en', 'he'];
const pluginNamespaces = plugins.map(p => p.id);

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'he',
    fallbackLng: 'he',
    debug: true,

    // 1. Register all plugin IDs as namespaces, plus the default 'translation'
    ns: ['translation', ...pluginNamespaces],
    defaultNS: 'translation',
    // 2. Set the default 'translation' namespace as the fallback.
    // If a key is not found in a plugin's namespace, i18next will look for it here.
    fallbackNS: 'translation',
    // 3. Add the statically imported plugin resources.
    resources: pluginResources,

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
