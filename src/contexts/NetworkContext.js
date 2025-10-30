import { createContext, useContext } from 'react';
import { graphqlMethods } from '/src/services/NetworkService';

export const NetworkContext = createContext(graphqlMethods);
