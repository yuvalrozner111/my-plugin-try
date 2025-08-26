// src/plugins/nowTime/manifest.js
export default {
  id: 'nowTime',
  title: 'Now Time',
  icon: '⏰',
  // Lazy-load the plugin's root React component when needed
  load: () => import('./index.jsx'),
};
