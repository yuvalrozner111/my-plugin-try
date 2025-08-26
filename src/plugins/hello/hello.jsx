import { observer } from 'mobx-react';
import { useStores_ } from '../../stores';
import { HelloContainer } from './hello.style.js';

// src/plugins/hello/index.jsx
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
    </HelloContainer>
  );
}

export default observer(Hello);
