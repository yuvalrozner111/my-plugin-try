
export default {
  id: 'PluginName',
  title: 'Plugin Template',
  icon: '🧩',
  theme: (await import('./ThemeStyle.js')).default,
  load: () => import('./pluginName.jsx'),
};