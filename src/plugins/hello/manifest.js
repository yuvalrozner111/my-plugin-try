import { HelloStore } from './HelloStore';

export default {
  id: 'hello',
  title: 'Hello',
  icon: '👋',
  load: () => import('./hello.jsx'),
  Store: HelloStore,
};
