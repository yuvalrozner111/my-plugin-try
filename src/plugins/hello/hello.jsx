import { observer } from 'mobx-react';
import { useStores_ } from '/src/stores';
import { HelloContainer } from './hello.style.js';

function Hello() {
  const { pluginStore } = useStores_();
  const helloStore = pluginStore.getStore('hello');

  return (
    <HelloContainer>
      👋 Hello {helloStore.name}
      <br />
      <input
        type="text"
        value={helloStore.name}
        onChange={e => helloStore.setName(e.target.value)}
      />
      <br />
      <img src="plugins/hello/beagle.jpg" alt="A cute beagle" />
    </HelloContainer>
  );
}

export default observer(Hello);