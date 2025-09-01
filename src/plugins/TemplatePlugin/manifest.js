
import { TemplatePluginStore } from './TemplatePluginStore';

export default {
  id: 'TemplatePluginId',
  title: 'Plugin Template',
  icon: '🧩',
  theme: (await import('./ThemeStyle.js')).default,

  /*      without a Store:     */
  // load: () => import('./PluginName.jsx'),

  /*      with a Store:        */
  load: () => import('./observerPluginName.jsx'),
  Store: TemplatePluginStore,
};