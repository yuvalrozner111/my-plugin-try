import { FailExampleStore } from './FailExampleStore.js';

export default {
  id: 'FailExample',
  title: 'Fail Example Plugin',
  icon: '❌',
  theme: (await import('./ThemeStyle.js')).default,
  constants: () => import('./constants/internal.js'),
  load: () => import('./failExample.jsx'),
  Store: FailExampleStore,
};