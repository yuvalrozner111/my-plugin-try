import { createContext, useContext } from 'react';
import { graphqlMethods } from '/src/services/NetworkService';

// 1. Create a context that holds the network service
export const NetworkContext = createContext(graphqlMethods);

// 2. Create the custom hook for components to use
export const useNetwork = () => useContext(NetworkContext);