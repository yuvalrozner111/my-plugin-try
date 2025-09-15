# plugins project

## Project Overview

This project is a plugin-based web application built with React. The core architecture is designed to be **modular**, **extensible**, and **decoupled**, allowing for independent development and deployment of features.

## Key Architectural Concepts:

* **Plugin System**: The application's functionality is extended through plugins located in the `src/plugins` directory. Plugins are **dynamically discovered and loaded** by the host application at startup.

* **Manifest-Driven**: Each plugin is defined by a `manifest.js` file. This manifest specifies the plugin's metadata (like `id`, `title`, and `icon`) and provides functions to **lazy-load** its main component and, optionally, its **theme overrides** and **MobX store**.

* **Runtime Plugin Configuration**: The host application can control which plugins are loaded and in what order through the `VITE_PLUGIN_ORDERED_LIST` environment variable in the `.env` file. This allows for flexible, environment-specific configurations without changing the code.

* **State Management & Decoupled Communication**:
    * Global and plugin-specific state is managed by **MobX**. A central `pluginStore` acts as a **registry** for all plugin stores, enabling a decoupled communication pattern between the host and plugins, as well as between plugins themselves.
    * Host stores (like `UserStore`) and the `pluginStore` are provided to all components via **React Context**, making them easily accessible throughout the application.
    * This architecture prevents hardcoded dependencies, as components interact with stores through string-based IDs rather than direct imports.

* **Theming**:
    * The application supports **light and dark themes** using `styled-components`. A central `CommonStyles.js` file defines the base theme palettes.
    * Plugins can **extend the base theme** by providing their own `themeStyle.js` file and referencing it in their manifest. These theme overrides are deeply merged with the application's active theme.

* **Internationalization (i18n)**: The application is fully internationalized using **`i18next`** and `react-i18next`. Language resources are stored in JSON files within the `public/locales` directory, and components use the `useTranslation` hook or the `FormatMessage` component to display translated strings.

* **Static Asset Management**: Plugins can include their own static assets (e.g., images) in a `public` sub-directory. The Vite build process is configured to automatically copy these assets to the final build output, making them accessible to the plugin's components.

* **Component Structure & Error Handling**:
    * The main application shell consists of `App.jsx`, a `PluginBar.jsx` to select plugins, and a `PluginOutlet.jsx` to render the active plugin.
    * The `PluginOutlet` includes a **React Error Boundary** to gracefully handle any rendering errors within a plugin, preventing a single faulty plugin from crashing the entire application.

## Instructions for Assisting

Your primary goal is to assist in developing this plugin-based application. When responding to requests, adhere to the following guidelines:

1.  **Analyze the Request and Existing Code**: Before generating any new code, carefully analyze the user's request and review the relevant files in the repository to understand the existing patterns and conventions.

2.  **Follow Established Patterns**:
    * When creating a new plugin, always use the `src/plugins/TemplatePlugin` as a starting point. This ensures consistency across all plugins.
    * For state management, if a plugin requires its own state, create a new MobX store that extends the `GenericStore` and register it in the plugin's `manifest.js` file.
    * For styling, use `styled-components`. If a plugin needs custom styles that go beyond the base theme, create a `themeStyle.js` file and provide theme overrides as demonstrated in the `byebye` plugin.
    * Always use lazy loading for plugin components (`load: () => import('./Component.jsx')`) in the manifest to ensure efficient code splitting.

3.  **Be Specific and Action-Oriented**: Provide complete, ready-to-use code snippets. When modifying existing files, clearly state which files need to be changed and provide the full, updated code for each file.

4.  **Explain Your Reasoning**: Briefly explain the "why" behind your code. For example, if you're adding a new MobX store, explain how it will manage the plugin's state. This helps with understanding and learning.

5.  **Maintain Code Quality**: Ensure that any code you generate is clean, readable, and follows modern React best practices.