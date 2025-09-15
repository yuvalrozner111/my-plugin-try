import React, { Suspense, useMemo, useState, useEffect } from "react";
import { ThemeProvider } from 'styled-components';
import { StringsContext } from '/src/context/StringsContext';
import { STRINGS as HostStrings } from '/src/constants/internal.js';

class Boundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("Plugin error:", error, info); }
  render() {
    if (this.state.error) return this.props.fallback ?? <div>Plugin crashed.</div>;
    return this.props.children;
  }
}

import { OutletContainer, Info } from "./PluginOutlet.style.js";

export default function PluginOutlet({ plugin }) {
  const Lazy = useMemo(() => plugin && React.lazy(plugin.load), [plugin?.id]);
  const [mergedStrings, setMergedStrings] = useState(HostStrings);

  // This effect runs whenever the active plugin changes.
  useEffect(() => {
    let isMounted = true;
    // If the plugin manifest exposes a 'constants' loader function...
    if (plugin?.constants) {
      // ...dynamically import the plugin's constants module.
      plugin.constants().then(pluginConstantsModule => {
        if (isMounted) {
          const pluginStrings = pluginConstantsModule.STRINGS || {};
          // Merge host and plugin strings, with plugin strings taking precedence.
          setMergedStrings({ ...HostStrings, ...pluginStrings });
        }
      });
    } else {
      // If the plugin has no constants, reset to only use the host's.
      setMergedStrings(HostStrings);
    }
    return () => { isMounted = false; };
  }, [plugin?.id]); // Rerun when the plugin changes

  return (
    <OutletContainer>
      {!plugin ? (
        <Info>No plugin selected.</Info>
      ) : (
        <Boundary fallback={<Info>Failed to load {plugin.title}.</Info>}>
          <Suspense fallback={<Info>Loading {plugin.title}</Info>}>
            {/* Provide the merged STRINGS object to the plugin's component tree */}
            <StringsContext.Provider value={mergedStrings}>
              {/* The existing ThemeProvider logic remains unchanged */}
              {plugin.theme ? (
                <ThemeProvider theme={(outerTheme) => {
                  /* ... theme merging logic ... */
                  const isPlainObject = (v) => v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date);
                  const deepMerge = (a, b) => {
                    if (isPlainObject(a) && isPlainObject(b)) {
                      const result = { ...a };
                      Object.keys(b).forEach((k) => {
                        result[k] = deepMerge(a?.[k], b[k]);
                      });
                      return result;
                    }
                    return b === undefined ? a : b;
                  };
                  let pluginThemeToMerge = plugin.theme;
                  if (pluginThemeToMerge && outerTheme && outerTheme.themeValue) {
                    const perThemeKey = `${outerTheme.themeValue}Theme`;
                    if (pluginThemeToMerge[perThemeKey]) {
                      pluginThemeToMerge = pluginThemeToMerge[perThemeKey];
                    }
                  }
                  return deepMerge(outerTheme || {}, pluginThemeToMerge || {});
                }}>
                  <Lazy />
                </ThemeProvider>
              ) : (
                <Lazy />
              )}
            </StringsContext.Provider>
          </Suspense>
        </Boundary>
      )}
    </OutletContainer>
  );
}