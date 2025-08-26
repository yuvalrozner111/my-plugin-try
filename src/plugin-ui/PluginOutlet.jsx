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

export default function PluginOutlet({ plugin }) {
  const Lazy = useMemo(() => plugin && React.lazy(plugin.load), [plugin?.id]); // load(): () => import('./index.jsx')
  return (
    <div className="plugin-outlet">
      {!plugin ? (
        <div style={{ padding: 12 }}>No plugin selected.</div>
      ) : (
        <Boundary fallback={<div style={{ padding: 12 }}>Failed to load {plugin.title}.</div>}>
          <Suspense fallback={<div style={{ padding: 12 }}>Loading {plugin.title}…</div>}>
            <Lazy />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
}
