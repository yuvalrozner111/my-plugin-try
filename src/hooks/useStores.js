import { useContext } from 'react';
import { StoresContext } from '/src/contexts/StoresContext';

export const useStores_ = () => useContext(StoresContext);