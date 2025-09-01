export default {
  id: 'ByeBye',
  title: 'ByeBye',
  icon: '👋',
  theme: (await import('./themeStyle.js')).default, // optional theme overrides
  load: () => import('./byebye.jsx'),
};
