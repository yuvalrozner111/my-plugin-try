import { createContext, useContext } from 'react';
import { pluginStore } from './PluginStore';

export const stores = {
  pluginStore,
};

export const StoresContext = createContext(stores);

export const useStores_ = () => useContext(StoresContext);
