import { useContext } from 'react';
import { NetworkContext } from '/src/contexts/StoresContext';

export const useNetwork = () => useContext(NetworkContext);
