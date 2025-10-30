import { observer } from 'mobx-react';
import { useStores_ } from '/src/hooks/useStores.js';
import { HelloContainer, BeagleContainer } from './hello.style.js';
import { useTranslation } from 'react-i18next';
import { useStrings } from '/src/hooks/useStrings.js';
import { useNotifications } from '/src/hooks/useNotification.js';

function Hello() {
  const { pluginStore } = useStores_();
  const helloStore = pluginStore.getStore('hello');
  const { t } = useTranslation('hello');
  const STRINGS = useStrings();
  const notify = useNotifications();

  const onBeagleClick = () => {
    console.log('Beagle Clicked!');

    notify.info({
      message: 'Beagle Clicked!',
      description: 'What a cutie!',
      placement: 'topRight', // We can now control placement
      duration: 8, // and duration per notification
    });
  };

  return (
    <HelloContainer>
      {/* Use the single STRINGS object for a plugin-specific key */}
      <p>{t(STRINGS.PLUGIN_GREETING)}</p>

      {/* Use the exact same STRINGS object for a host-app key */}
      <p>A shared string from the host: <strong>{t(STRINGS.WELCOME_TITLE)}</strong></p>
      
      <br />
      👋 Hello {helloStore.name}
      <br />
      <input
        type="text"
        value={helloStore.name}
        onChange={e => helloStore.setName(e.target.value)}
      />
      <br />
      <BeagleContainer>
        <img onClick={onBeagleClick} src="plugins/hello/beagle.jpg" alt={t(STRINGS.BEAGLE_ALT_TEXT)} />
      </BeagleContainer>
    </HelloContainer>
  );
}

export default observer(Hello);