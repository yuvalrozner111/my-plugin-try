/**
 * This module uses Vite's `import.meta.glob` to dynamically find all plugin
 * translation files at build time. It then processes them into a nested
 * object that i18next can consume in its `resources` configuration.
 *
 * The output format is: { lang: { namespace: { key: value } } }
 * e.g., { en: { hello: { GREETING: "Hello!" } } }
 */

// Eagerly import all plugin translation files and app-level locales,
// then merge them into a single map. App-level files will overwrite
// plugin files with the same path if there are duplicates.
const pluginTranslationModules = import.meta.glob('/src/plugins/**/public/locales/**/*.json', {
    eager: true,
    import: 'default',
});
const appTranslationModules = import.meta.glob('/public/locales/**/*.json', {
    eager: true,
    import: 'default',
});

const translationModules = { ...pluginTranslationModules, ...appTranslationModules };

// The path format is: /src/plugins/<plugin-id>/locales/<lang>/translation.json
// or the app-level: /src/locales/<lang>/translation.json
const pathRegex = /^(?:\/src\/plugins\/([^\/]+)\/(?:public\/)?locales\/([^\/]+)|\/public\/locales\/([^\/]+))\/translation\.json$/;

export const pluginResources = Object.entries(translationModules).reduce(
    (acc, [path, content]) => {
        const match = path.match(pathRegex);
        if (!match) return acc;

        // match layout:
        // - for plugin files: match[1] = pluginId, match[2] = lang
        // - for root app locales: match[1] = undefined, match[2] = undefined, match[3] = lang
        const pluginId = match[1] || 'translation'; // use default 'translation' namespace for app-level locales
        const lang = match[2] || match[3];

        // Ensure the language and namespace objects exist
        if (!acc[lang]) acc[lang] = {};
        if (!acc[lang][pluginId]) acc[lang][pluginId] = {};

        // Merge the content into the correct namespace
        acc[lang][pluginId] = { ...acc[lang][pluginId], ...content };

        return acc;
    },
    {}
);
