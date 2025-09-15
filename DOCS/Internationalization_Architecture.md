# Architectural Deep Dive: The Internationalization (i18n) System

This document provides a comprehensive overview of the internationalization (i18n) architecture in this plugin-based application. The system is designed to be modular, scalable, and decoupled, allowing each plugin to manage its own translations independently without requiring manual changes to the host application.

## Core Principles

* **Decoupling**: The host application has no hardcoded knowledge of any specific plugin's translations.
* **Automatic Discovery**: Plugin translation files are discovered and loaded automatically at build time.
* **Namespace-based Separation**: Each plugin's translations are isolated in their own namespace to prevent conflicts.
* **Shared Translations**: A fallback mechanism allows plugins to reuse common strings defined by the host, promoting consistency and reducing duplication.

## The Workflow: From Build to Render

The entire process can be broken down into three main stages: build-time discovery, runtime initialization, and component rendering.

### 1. Build-Time: Automatic Discovery of Translations

The foundation of the system is a script that automatically finds all translation files at build time.

**File**: `src/config/plugin-translations.js`

This file uses Vite's `import.meta.glob` feature to scan the entire project for translation files. It looks in two primary locations:
1.  The host application's locales: `/src/locales/**/*.json`.
2.  Each plugin's public locales folder: `/src/plugins/**/public/locales/**/*.json`.

It then processes these file paths to build a `resources` object that `i18next` can understand. For a path like `/src/plugins/hello/public/locales/en/translation.json`, the script:
1.  Extracts the language code: `en`.
2.  Extracts the plugin's folder name: `hello`.
3.  Uses the plugin's `manifest.js` to map the folder name to the official plugin `id` (e.g., 'hello'). This `id` becomes the i18n namespace.
4.  Merges the JSON content into the final structure: `{ en: { hello: { ...translations } } }`.

Host translations are placed under the default `translation` namespace.

### 2. Runtime: `i18next` Initialization

With all resources aggregated, the main `i18next` instance is configured.

**File**: `src/config/i18n.js`

This configuration file performs several key actions:
1.  **Imports Plugin Metadata**: It imports the list of all active plugins to get their IDs.
2.  **Defines Namespaces**: It dynamically creates a list of all plugin IDs and registers them as namespaces (`ns`) with `i18next`. The default `translation` namespace is also included.
3.  **Sets Fallback Namespace**: Crucially, it sets `fallbackNS: 'translation'`. This tells `i18next` that if a translation key is not found within a plugin's specific namespace, it should look for it in the host's `translation` namespace. This is how shared strings are implemented.
4.  **Loads Resources**: The `resources` object generated during the build step is passed directly to the `i18n.init()` function, making all translations immediately available on app load without extra HTTP requests.

### 3. The `STRINGS` Constant Pattern

To improve maintainability and avoid "magic strings" in the code, the application uses a convention of defining translation keys as constants.

* **Host**: `src/constants/internal.js` defines keys for shared strings (e.g., `WELCOME_TITLE`).
* **Plugins**: Each plugin can have its own `constants/internal.js` file for its specific strings (e.g., `PLUGIN_GREETING` in the 'hello' plugin).

### 4. Host-Plugin Integration: The Role of `PluginOutlet`

The bridge between the host and the active plugin's translations is the `PluginOutlet` component.

**File**: `src/plugin-host/PluginOutlet.jsx`

When a plugin is selected, the `PluginOutlet` dynamically prepares its environment. A `useEffect` hook runs whenever the active plugin changes:
1.  It checks if the plugin's manifest defines a function to load its constants (`plugin.constants`).
2.  If it does, it dynamically imports the plugin's constants module.
3.  Once loaded, it **merges** the host's `STRINGS` object with the plugin's `STRINGS` object.
4.  This newly merged `STRINGS` object is then passed down to the plugin's component tree using a React Context provider (`<StringsContext.Provider>`).

This ensures that the rendered plugin has access to both its own keys and all shared keys from the host.

### 5. Putting It All Together: Usage in a Plugin

Finally, a component inside a plugin uses these systems to render translated text.

**File**: `src/plugins/hello/hello.jsx`

```javascript
import { useTranslation } from 'react-i18next';
import { useStrings } from '/src/hooks/useStrings.js';

function Hello() {
  // 1. Get the 't' function, scoped to the 'hello' namespace
  const { t } = useTranslation('hello');
  // 2. Get the merged STRINGS object from the context
  const STRINGS = useStrings();

  return (
    <>
      {/* 3a. Renders a key defined in the plugin's constants */}
      <p>{t(STRINGS.PLUGIN_GREETING)}</p>

      {/* 3b. Renders a key defined in the host's constants */}
      <p>A shared string from the host: <strong>{t(STRINGS.WELCOME_TITLE)}</strong></p>
    </>
  );
}