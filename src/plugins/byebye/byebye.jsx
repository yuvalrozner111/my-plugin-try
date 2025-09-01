import { useState } from "react";
import { ByeByeContainer, ControlsRow, CounterButton, CountLabel, StyledDiv1, StyledDiv2 } from "./byebye.style.js";

import { observer } from 'mobx-react';
import { useStores_ } from '/src/stores';

function ByeBye() {
  const [count, setCount] = useState(0);

  const { pluginStore } = useStores_();
  const helloStore = pluginStore.getStore('hello');

  return (
    <ByeByeContainer>
      ByeBye from the plugin. 👋
      <ControlsRow>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <StyledDiv1>Color defined by - Base App CommonStyle theme</StyledDiv1>
          <StyledDiv2>Color defined by - Plugin themeStyle theme</StyledDiv2>
          <CounterButton onClick={() => setCount((c) => c + 1)}>
            Counter Increase 
          </CounterButton>
          <CountLabel>Count: {count}</CountLabel>
        </div>
      </ControlsRow>
      <input
        type="text"
        value={helloStore.name}
        onChange={e => helloStore.setName(e.target.value)}
      />
    </ByeByeContainer>
  );
}

export default observer(ByeBye);
