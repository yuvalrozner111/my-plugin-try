// src/plugins/hello/manifest.js
import { HelloStore } from './HelloStore';

export default {
  id: 'hello',
  title: 'Hello',
  icon: '👋',
  // Lazy-load the plugin's root React component when needed
  load: () => import('./hello.jsx'),
  Store: HelloStore,
};
