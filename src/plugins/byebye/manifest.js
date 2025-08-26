// src/plugins/hello/manifest.js
export default {
  id: 'ByeBye',
  title: 'ByeBye',
  icon: '👋',
  // Lazy-load the plugin's root React component when needed
  load: () => import('./byebye.jsx'),
};
