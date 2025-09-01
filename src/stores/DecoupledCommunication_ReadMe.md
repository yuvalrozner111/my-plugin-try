# Decoupled Communication: Host and Plugins

A core architectural challenge in a plugin-based system is enabling communication between the host application and its plugins without creating rigid, hardcoded dependencies. This document outlines the strategy used in this project to achieve this.

## The Challenge: Avoiding Hardcoded Dependencies

A naive approach to communication would be for the host application to directly `import` code from a plugin.

#### What We Avoid:

```javascript
// In a host component...
import { HelloStore } from './plugins/hello/HelloStore'; // <-- A hardcoded dependency!

const store = new HelloStore();
store.someAction();
```

This creates a **hardcoded, build-time dependency**. This is highly undesirable in a plugin architecture because:
* **It breaks modularity**: If the `hello` plugin is removed, the host application's `import` statement will break, and the entire application will fail to build.
* **It's not scalable**: The host would need to be modified every time a new plugin is added or removed.

## The Solution: Runtime Discovery via a Registry

Our architecture solves this by using a central registry, the `PluginStore`, which acts as a middleman. Communication is achieved not through direct imports, but indirectly through string-based IDs.

The process is as follows:
1.  **Self-Registration**: At application startup, a `plugin-loader` finds every plugin. Each plugin's `manifest` announces its store, which is then registered in the `PluginStore` using the plugin's unique string ID (e.g., `'hello'`).
2.  **Indirect Communication**: When the host needs to interact with a plugin, it does not import the plugin's files. Instead, it queries the `PluginStore` registry using the string ID of the target plugin.

### How It Works in Practice

The host's code remains generic and reusable. For example, a function to reset the currently active plugin would look like this:

```javascript
function resetActivePlugin(activeId, pluginStore) {
  // 1. Get the store using a variable string ID.
  const store = pluginStore.getStore(activeId);

  // 2. Interact based on a common interface (a "contract").
  if (store && store.reset) {
    store.reset();
  }
}
```

This function doesn't know or care if the `activeId` is `'hello'` or `'some-other-plugin'`. It is completely decoupled from any specific plugin's source code.
