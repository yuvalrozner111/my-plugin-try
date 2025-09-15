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
const appTranslationModules = import.meta.glob('/src/locales/**/*.json', {
    eager: true,
    import: 'default',
});

// Also eagerly import plugin manifests so we can map plugin folder names
// to the declared plugin id (manifest.id). This lets translation namespaces
// use the plugin's manifest id even if the folder name differs.
const manifestModules = import.meta.glob('/src/plugins/**/manifest.js', {
    eager: true,
    import: 'default',
});

const translationModules = { ...pluginTranslationModules, ...appTranslationModules };

// The path format is: /src/plugins/<plugin-folder>/public/locales/<lang>/translation.json
// or the app-level: /src/locales/<lang>/translation.json
const pathRegex = /^(?:\/src\/plugins\/([^\/]+)\/(?:public\/)?locales\/([^\/]+)|\/src\/locales\/([^\/]+))\/translation\.json$/;

// Build a map from plugin folder name -> manifest.id (if available)
const folderToManifestId = Object.entries(manifestModules).reduce((map, [mPath, manifest]) => {
    // manifest path format: /src/plugins/<folder>/manifest.js
    const mMatch = mPath.match(/\/src\/plugins\/([^\/]+)\/manifest\.js$/);
    if (!mMatch) return map;
    const folder = mMatch[1];
    if (manifest && manifest.id) map[folder] = manifest.id;
    return map;
}, {});

export const pluginResources = Object.entries(translationModules).reduce(
    (acc, [path, content]) => {
        const match = path.match(pathRegex);
        if (!match) return acc;

    // match layout:
    // - for plugin files: match[1] = pluginFolderName, match[2] = lang
    // - for root app locales: match[1] = undefined, match[2] = undefined, match[3] = lang
    const pluginFolder = match[1];
    const lang = match[2] || match[3];

    // Prefer the manifest-declared id for the namespace, fall back to the folder name.
    const pluginId = pluginFolder ? (folderToManifestId[pluginFolder] || pluginFolder) : 'translation';

        // Ensure the language and namespace objects exist
        if (!acc[lang]) acc[lang] = {};
        if (!acc[lang][pluginId]) acc[lang][pluginId] = {};

        // Merge the content into the correct namespace
        acc[lang][pluginId] = { ...acc[lang][pluginId], ...content };

        return acc;
    },
    {}
);
