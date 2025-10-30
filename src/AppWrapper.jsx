import { useEffect } from 'react';
import { notification } from 'antd';
import App from './App.jsx';
import { NotificationContext } from './contexts/NotificationContext.js';
import { useStores_ } from './hooks/useStores.js';

/**
 * This component wraps the main App to properly initialize
 * AntD's hook-based notification system.
 */
export default function AppWrapper() {
  // 1. Get the AntD notification api and the contextHolder
  const [api, contextHolder] = notification.useNotification();
  
  // 2. Get the stores from the parent provider
  const stores = useStores_();

  // 3. Inject the 'api' into the stores once it's available.
  // This "late-binding" allows stores to use the context-aware API.
  useEffect(() => {
    if (api) {
      stores.userStore.setNotificationService(api);
      stores.pluginStore.setNotificationService(api);
    }
  }, [api, stores]);
  
  return (
    // 4. Provide the 'api' to all components via context
    <NotificationContext.Provider value={api}>
      {/* 5. Render the contextHolder to display notifications */}
      {contextHolder}
      
      {/* 6. Render the rest of the application */}
      <App />
    </NotificationContext.Provider>
  );
}