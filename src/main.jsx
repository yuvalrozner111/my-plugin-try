import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper.jsx';
import { StoresContext, stores } from './contexts/StoresContext.js';
import { NetworkContext } from './contexts/NetworkContext.js';
import { client, graphqlMethods } from './services/NetworkService.js';

// 1. Inject the stores into the client (for headers, token refresh)
client.setStores(stores);

// 2. Inject the network service into the host stores
stores.userStore.setNetworkService(graphqlMethods);
stores.pluginStore.setNetworkService(graphqlMethods); // This will arm the PluginStore for all future plugins

// 3. The notification service injection is REMOVED from here.
// It will be handled by AppWrapper.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoresContext.Provider value={stores}>
      <NetworkContext.Provider value={graphqlMethods}>
        <Suspense fallback={<div>Loading translations...</div>}>
          <AppWrapper />
        </Suspense>
      </NetworkContext.Provider>
    </StoresContext.Provider>
  </StrictMode>,
);