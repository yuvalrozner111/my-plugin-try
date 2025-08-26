
// Eagerly import all manifests at build time
const manifestModules = import.meta.glob('./plugins/**/manifest.{js,jsx}', {
  eager: true,
  import: 'default',
});

// Turn the modules into a clean array/registry
export const plugins = Object.entries(manifestModules).map(([path, manifest]) => ({
  ...manifest,
  _path: path, // useful for debugging
}));

export const pluginById = Object.fromEntries(plugins.map(p => [p.id, p]));
