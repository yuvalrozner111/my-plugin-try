# Developer Guide: Adding Translations to a Plugin

This guide provides a step-by-step walkthrough for adding internationalization (i18n) support to your new plugin. The system is designed to be simple and requires no changes to the host application's core configuration.

## Step 1: Create Translation Files

The host application will automatically discover your plugin's translation files if you place them in the correct directory structure.

Inside your plugin's main folder (e.g., `src/plugins/MyNewPlugin/`), create the following folder structure:

```
src/plugins/MyNewPlugin/
└── public/
└── locales/
├── en/
│   └── translation.json
└── he/
└── translation.json
```

Each `translation.json` file contains the key-value pairs for that language.

**Example: `en/translation.json`**
```json
{
  "MY_PLUGIN_GREETING": "Hello from my new plugin!",
  "SOME_OTHER_TEXT": "This is some other text."
}
```

**Example: `he/translation.json`**
```json
{
  "MY_PLUGIN_GREETING": "!שלום מהפלאגין החדש שלי",
  "SOME_OTHER_TEXT": ".זה טקסט אחר"
}
```

## Step 2: Define String Constants

To avoid using raw strings in your code, you should define your translation keys in a constants file. This improves maintainability and reduces errors.

1. Create a constants folder inside your plugin's directory.

2. Inside it, create a file named internal.js.

File: `src/plugins/MyNewPlugin/constants/internal.js`

```javascript
export const STRINGS = {
  MY_PLUGIN_GREETING: 'MY_PLUGIN_GREETING',
  SOME_OTHER_TEXT: 'SOME_OTHER_TEXT',
};
```

**Note:** The key and value should be identical. This object provides a safe way to reference the keys from your JSON files.

## Step 3: Register Constants in the Manifest

You must tell the host application where to find your plugin's string constants. This is done by adding a single line to your plugin's `manifest.js` file.

**File:** `src/plugins/MyNewPlugin/manifest.js`

```javascript
export default {
  id: 'MyNewPluginId', // Make sure this is unique
  title: 'My New Plugin',
  icon: '🚀',
  load: () => import('./MyNewPlugin.jsx'),
  
  // Add this line to register your constants file
  constants: () => import('./constants/internal.js'),
};
```

This allows the `PluginOutlet` to dynamically load your `STRINGS` object when your plugin becomes active.

## Step 4: Using Translations in Your Component
You can now use the translations in your plugin's React components.

**File:** `src/plugins/MyNewPlugin/MyNewPlugin.jsx`

```javascript
import { useTranslation } from 'react-i18next';
import { useStrings } from '/src/hooks/useStrings.js';

export default function MyNewPlugin() {
  // 1. Get the 't' function, scoped to your plugin's ID from the manifest.
  const { t } = useTranslation('MyNewPluginId');
  
  // 2. Get the merged STRINGS object (contains your plugin's keys and the host's keys).
  const STRINGS = useStrings();

  return (
    <div>
      {/* 3. Use the 't' function with keys from your STRINGS object. */}
      <p>{t(STRINGS.MY_PLUGIN_GREETING)}</p>

      {/* You can also use shared strings from the host application. */}
      <p>Shared Host String: {t(STRINGS.WELCOME_TITLE)}</p>
    </div>
  );
}
```

**That's It!**

The build system and host application handle the rest. Your translation files will be automatically bundled, and your strings will be available to your component when it renders.