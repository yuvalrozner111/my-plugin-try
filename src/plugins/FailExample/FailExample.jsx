import React, { useEffect } from 'react';
import { PluginNameContainer } from "./PluginName.style.js";
import { observer } from 'mobx-react';
import { useStores_ } from '/src/hooks/useStores.js';
import { useTranslation } from 'react-i18next';
import { useStrings } from '/src/hooks/useStrings.js';

function FailExample() {
  const { userStore, pluginStore } = useStores_();
  const failExampleStore = pluginStore.getStore('FailExamplee');
  
  // 1. Get the translation function, scoped to this plugin's namespace
  const { t } = useTranslation('FailExample');
  
  // 2. Get the merged STRINGS object (host + plugin)
  const STRINGS = useStrings();

  return (
    <PluginNameContainer>
      <p>yuvalllllllllllllllllllll</p>
      <p>{t(STRINGS.WELCOME_MESSAGE)}</p>

      <div>
        <br />
        User Name from host's UserStore: {userStore.user ? userStore.user.name : 'Guest'}
        <br />
        Example Value from TemplatePluginStore: {templatePluginStore ? templatePluginStore.exampleValue : 'N/A'}
        <br />
        Backend message: {templatePluginStore ? templatePluginStore.backendMessage : 'N/A'}
        <br />
        <button
          onClick={() => {
            if (failExampleStore) {
              console.log('Fetching example data from backend...');
              failExampleStore.fetchExampleData();
            }
          }}
        >
          Fetch Example from Backend
        </button>
      </div>
    </PluginNameContainer>
  );
}

export default observer(FailExample);