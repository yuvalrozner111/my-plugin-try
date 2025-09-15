import { createContext, useContext } from 'react';
import { STRINGS as HostStrings } from '/src/constants/internal.js';

/**
 * Creates a React Context that will hold the merged STRINGS object
 * (host + active plugin). We provide the host's STRINGS as the default
 * value so that even if a plugin doesn't have its own strings, the context
 * will still provide a valid object.
 */
export const StringsContext = createContext(HostStrings);

/**
 * A custom hook that simplifies accessing the merged STRINGS object
 * from the context. Plugin components will use this hook.
 */
export const useStrings = () => useContext(StringsContext); 