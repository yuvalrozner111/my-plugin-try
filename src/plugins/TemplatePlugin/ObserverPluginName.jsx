import { PluginNameContainer} from "./PluginName.style.js";
import { observer } from 'mobx-react';
import { useStores_ } from '/src/stores/index.js';

function ObserverPluginName() {
  const { userStore } = useStores_();
  const { pluginStore } = useStores_();
  const templatePluginStore = pluginStore.getStore('TemplatePluginId');

  return (
    <PluginNameContainer>
      This is a New Plugin Template. 🧩
      <div>
        <br />
        User Name from host's UserStore: {userStore.user ? userStore.user.name : 'Guest'}
        <br />
        Example Value from TemplatePluginStore: {templatePluginStore.exampleValue}
      </div>
    </PluginNameContainer>
  );
}

export default observer(ObserverPluginName);
