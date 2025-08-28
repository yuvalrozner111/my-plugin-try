import React, { Suspense, useMemo } from "react";
import { ThemeProvider } from 'styled-components';

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
  const Lazy = useMemo(() => plugin && React.lazy(plugin.load), [plugin?.id]); // load(): () => import('./index.jsx')
  return (
    <OutletContainer>
      {!plugin ? (
        <Info>No plugin selected.</Info>
      ) : (
        <Boundary fallback={<Info>Failed to load {plugin.title}.</Info>}>
          <Suspense fallback={<Info>Loading {plugin.title}</Info>}>
            {/* If a plugin exposes a `theme` object, merge it with the app theme so plugin components
                can access merged theme via styled-components' ThemeProvider. We perform a deep
                recursive merge for plain objects so nested objects of arbitrary depth are merged. */}
            {plugin.theme ? (
              <ThemeProvider theme={(outerTheme) => {
                const isPlainObject = (v) =>
                  v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date);

                const deepMerge = (a, b) => {
                  // if both sides are plain objects, merge keys recursively
                  if (isPlainObject(a) && isPlainObject(b)) {
                    const result = { ...a };
                    Object.keys(b).forEach((k) => {
                      result[k] = deepMerge(a?.[k], b[k]);
                    });
                    return result;
                  }
                  // otherwise prefer b when defined, else keep a
                  return b === undefined ? a : b;
                };

                // Support plugin.theme that provides per-theme overrides, e.g. { darkTheme: {...}, lightTheme: {...} }
                let pluginThemeToMerge = plugin.theme;
                if (pluginThemeToMerge && outerTheme && outerTheme.themeValue) {
                  const perThemeKey = `${outerTheme.themeValue}Theme`; // 'darkTheme' or 'lightTheme'
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
          </Suspense>
        </Boundary>
      )}
    </OutletContainer>
  );
}
