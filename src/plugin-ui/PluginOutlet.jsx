import React, { Suspense, useMemo } from "react";

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
    <OutletContainer className="plugin-outlet">
      {!plugin ? (
        <Info>No plugin selected.</Info>
      ) : (
        <Boundary fallback={<Info>Failed to load {plugin.title}.</Info>}>
          <Suspense fallback={<Info>Loading {plugin.title}…</Info>}>
            <Lazy />
          </Suspense>
        </Boundary>
      )}
    </OutletContainer>
  );
}
