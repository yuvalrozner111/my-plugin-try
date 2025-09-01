import { pluginStore } from '../stores/PluginStore';

// Eagerly import all manifests at build time
const manifestModules = import.meta.glob('./../plugins/**/manifest.{js,jsx}', {
  eager: true,
  import: 'default',
});

// Turn the modules into a clean array/registry
let plugins = Object.entries(manifestModules).map(([path, manifest]) => ({
  ...manifest,
  _path: path, // useful for debugging
}));

//
// Host-app controlled filtering and sorting
//
const { VITE_PLUGIN_ORDERED_LIST } = import.meta.env;

// Filter plugins based on VITE_PLUGIN_ORDERED_LIST environment variable
if (VITE_PLUGIN_ORDERED_LIST) {
  const enabledPlugins = VITE_PLUGIN_ORDERED_LIST.split(',').map(p => p.trim());
  plugins = plugins.filter(p => enabledPlugins.includes(p.id));
}

// Sort plugins based on VITE_PLUGIN_ORDERED_LIST environment variable
if (VITE_PLUGIN_ORDERED_LIST) {
  const pluginOrder = VITE_PLUGIN_ORDERED_LIST.split(',').map(p => p.trim());
  plugins.sort((a, b) => {
    const aIndex = pluginOrder.indexOf(a.id);
    const bIndex = pluginOrder.indexOf(b.id);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

export { plugins };

plugins.forEach(plugin => {
  if (plugin.Store) {
    pluginStore.registerStore(plugin.id, new plugin.Store());
  }
});

export const pluginById = Object.fromEntries(plugins.map(p => [p.id, p]));
