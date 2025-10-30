# Developer Guide: Notification & Error Handling Mechanism

This document explains the application's decoupled notification system. It is designed to allow the host application to provide a centralized notification API (using AntD) that any plugin can consume without creating a direct dependency on `antd`.

The mechanism provides two ways for plugins to trigger notifications:
1.  **From Components**: Using the `useNotifications()` hook.
2.  **From Stores**: Using the `this.notificationService` property (e.g., after a network request).

## Core Architectural Components

The system is built on a "late-binding" pattern to correctly use AntD's `notification.useNotification()` hook, which is required for notifications to be aware of the `styled-components` theme.

### 1. `AppWrapper.jsx`
This is the key component for the entire system. It sits between `main.jsx` and `App.jsx`.

* It is the **only** place in the app that calls `notification.useNotification()`.
* This call gives it two crucial items: the `api` object (for triggering notifications) and the `contextHolder` (a React element that renders the notifications).
* It renders the `{contextHolder}`.
* It wraps the main `<App />` component in the `NotificationContext.Provider`.

### 2. `NotificationContext.js` & `useNotification.js`
These files provide access for React components.
* `NotificationContext` is a simple `createContext(null)`.
* The `useNotifications` hook is a simple `useContext(NotificationContext)` that allows any component to get the `api` object.

### 3. `GenericStore.js` & `PluginStore.js`
These stores are updated to support injecting the notification `api` object.
* `GenericStore` has a `setNotificationService(service)` method.
* `PluginStore` also has this method. When called, it injects the service into all currently registered plugin stores and will inject it into any *future* stores upon registration.

## How It Works: The Initialization Flow

1.  **`main.jsx`**: Renders `<AppWrapper />` inside the `StoresContext.Provider`.
2.  **`AppWrapper.jsx`**:
    * Calls `notification.useNotification()` to get the `api` and `contextHolder`.
    * Renders the `{contextHolder}`.
    * Renders `<NotificationContext.Provider value={api}>`.
    * Uses a `useEffect` hook to call `stores.userStore.setNotificationService(api)` and `stores.pluginStore.setNotificationService(api)`.
3.  **`PluginStore.js`**:
    * Receives the `api` object.
    * Iterates through all registered plugin stores (e.g., `TemplatePluginStore`) and calls `store.setNotificationService(api)`.
4.  **Result**: The context-aware AntD `api` is now available to all components via the `useNotifications` hook and to all stores via the `this.notificationService` property.

## How to Use in a Plugin

Plugins can use this system without ever importing `antd` or `AppWrapper`.

### 1. From a Plugin Component
Use the `useNotifications` hook to get the `api` object.

**File: `src/plugins/TemplatePlugin/ObserverPluginName.jsx`**
```javascript
import { useNotifications } from '/src/hooks/useNotification.js'; 

function ObserverPluginName() {
  // 1. Get the notification hook
  const notify = useNotifications();

  const handleInfoClick = () => {
    // 2. Use the AntD object-based API
    notify.info({
      message: 'Info from Plugin',
      description: 'This was triggered from the component.',
      placement: 'topRight',
    });
  };

  return (
    <button onClick={handleInfoClick}>
      Show Component Notification
    </button>
  );
}
```

### 2. From a Plugin Store
Use the `this.notificationService` property, which is automatically injected by `GenericStore`.
**File: `src/plugins/TemplatePlugin/TemplatePluginStore.js`**
```javascript
import { flow } from 'mobx';
import { GenericStore } from '/src/stores/GenericStore';

export class TemplatePluginStore extends GenericStore {
  // ...

  *fetchExampleData() {
    this.backendMessage = 'Loading...';
    try {
      // ... (network request)
      this.backendMessage = response.data.getExample;
      
      // 1. Use the injected service on success
      this.notificationService?.success({
        message: 'Data Fetched!',
        description: 'TemplatePluginStore got data.',
      });

    } catch (error) {
      this.backendMessage = 'Error!';

      // 2. Use the injected service on error
      this.notificationService?.error({
        message: 'Fetch Failed',
        description: 'Could not fetch example data from backend.',
      });
    }
  }
};
```

## How This Achieves Decoupling
*   **No Direct Dependencies:** A plugin never imports `antd`. It only imports the generic `useNotifications` hook or extends `GenericStore`.

*   **Host-Controlled Implementation:** The host (via `AppWrapper`) is 100% in charge of which notification library to use. If you wanted to replace `antd` with a different library, you would only modify `AppWrapper.jsx`, and all plugins would continue to work without any changes.

*   **Single Source of Truth:** The `api` object is created once in `AppWrapper` and distributed, ensuring all notifications are part of the same context and will be rendered correctly within the `styled-components` theme.