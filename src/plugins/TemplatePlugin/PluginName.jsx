import { PluginNameContainer} from "./PluginName.style.js";
import { useTranslation } from 'react-i18next';
import { useStrings } from '/src/hooks/useStrings.js';

export default function PluginName() {

    // 1. Get the translation function, scoped to this plugin's namespace
    const { t } = useTranslation('TemplatePluginId');
    
    // 2. Get the merged STRINGS object (host + plugin)
    const STRINGS = useStrings();

  return (
    <PluginNameContainer>
      <p>{t(STRINGS.TEMPLATE_PLUGIN_GREETING)}</p>
      <p>{t(STRINGS.WELCOME_MESSAGE)}</p>
    </PluginNameContainer>
  );
}
