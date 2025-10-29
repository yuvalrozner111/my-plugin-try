import { ByeByeStore } from './ByeByeStore.js';

export default {
  id: 'ByeBye',
  title: 'ByeBye',
  icon: '👋',
  Store: ByeByeStore,
  theme: (await import('./themeStyle.js')).default, // optional theme overrides
  load: () => import('./byebye.jsx'),
};
