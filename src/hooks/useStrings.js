import { useContext } from 'react';
import { StringsContext } from '/src/contexts/StringsContext';

export const useStrings = () => useContext(StringsContext);