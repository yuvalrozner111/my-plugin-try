// src/plugins/nowTime/manifest.js
export default {
  id: 'nowTime',
  titleKey: 'PLUGIN_TITLE',
  icon: '⏰',
  // Lazy-load the plugin's root React component when needed
  load: () => import('./nowTime.jsx'),
  constants: () => import('./constants/internal.js'),
};
