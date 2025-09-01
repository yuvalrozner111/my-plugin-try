# Project State Management Architecture

This document outlines the state management strategy for this plugin-based React application. The architecture is built on MobX and React Context to create a modular, decoupled, and reactive system.

## Core Objectives

The primary goals of this architecture are:
* **Modularity**: The host application should not have hardcoded dependencies on any specific plugin.
* **Decoupling**: Plugins should be self-contained units that can be added or removed without modifying the core application's code.
* **Reactivity**: The UI must automatically update when the underlying state changes.
* **Centralized Communication**: Provide a single, predictable hub for different parts of the application (host and plugins) to interact with each other's state.

## Key Components

The system is composed of three main parts:

### 1. `PluginStore`
The `PluginStore` is the heart of the plugin state system. It acts as a central **registry** for all plugin-specific stores. It is essentially a dictionary that maps a plugin's unique `id` to its store instance.

### 2. Host Stores (e.g., `UserStore`)
The host application can have its own global stores for managing cross-cutting concerns like user authentication, application settings, or theme data. These exist alongside the `PluginStore` but are not registered within it.

### 3. React Context
We use React's `createContext` and `useContext` APIs to "broadcast" all the stores from the top of the application. This makes the `pluginStore` and any host stores available to every component (in the host or in a plugin) without needing to pass them down as props.

## The Workflow: From Registration to Usage

1.  **Definition**: A plugin defines its own MobX store (e.g., `HelloStore`) and exposes the class in its `manifest.js` file.
2.  **Registration**: On application startup, the `plugin-loader.js` script dynamically imports all plugin manifests. If a manifest exposes a `Store`, it creates an instance of it and registers it with the central `pluginStore`.
3.  **Provision**: In `main.jsx`, the root `<App>` component is wrapped in a `<StoresContext.Provider>`. The `value` of this provider is an object containing the `pluginStore` and all other host stores.
4.  **Consumption**: Any component can access the stores by using the `useStores_()` custom hook. To become reactive to state changes, the component must be wrapped in the `observer` higher-order component from `mobx-react`.

## A Central Communication Hub

This architecture enables seamless communication across the entire application:

* **Host ↔️ Plugin**: The host can get any plugin's store via `pluginStore.getStore('plugin-id')` to read its state or call actions. A plugin can access a host store (e.g., `userStore`) to read global app state or trigger app-wide changes.
* **Plugin ↔️ Plugin**: One plugin can access another plugin's store through the central `pluginStore`. This allows plugins to interact with each other without being directly aware of one another.

This turns the store system into a powerful and flexible communication bus.