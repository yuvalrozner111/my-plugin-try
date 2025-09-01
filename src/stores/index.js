import { createContext, useContext } from 'react';
import { pluginStore } from './PluginStore';
import { userStore } from './UserStore';

export const stores = {
  pluginStore,
  userStore,
};

export const StoresContext = createContext(stores);

export const useStores_ = () => useContext(StoresContext);


/**
 * In React, createContext and useContext work together to share data throughout your component tree without having to pass props down manually at every level.
 * This is a powerful way to manage "global" state for a section of your app.
 */


/**
 *    1.    createContext: Creates the "channel" or context object.
 *    2.    <Context.Provider>: Broadcasts a value over that channel to all its children.
 *    3.    useContext: Subscribes a child component to that channel to receive the value.
 */
