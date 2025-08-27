export default {
  id: 'ByeBye',
  title: 'ByeBye',
  icon: '👋',
  theme: (await import('./themeStyle.js')).default, // optional theme overrides
  // Lazy-load the plugin's root React plugin when needed
  load: () => import('./byebye.jsx'),
};
