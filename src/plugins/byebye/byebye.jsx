import { useState } from "react";
import { ByeByeContainer, ControlsRow, CounterButton, CountLabel, StyledDiv1, StyledDiv2 } from "./byebye.style.js";

import { observer } from 'mobx-react';
import { useStores_ } from '/src/hooks/useStores.js';

function ByeBye() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState('user-1');

  const { pluginStore, userStore } = useStores_();
  const helloStore = pluginStore.getStore('hello');
  const byeByeStore = pluginStore.getStore('ByeBye');

  const handleClick = () => {
    byeByeStore.fetchCountry('US');
    setCount((c) => c + 1);
  };

  const handleFetchUser = async () => {
    if (!userId) return;
    // fetchUserProfile is a mobx flow (generator) which returns a promise
    await userStore.fetchUserProfile(userId);
    // userStore.user will update reactively (this component is an observer)
  };

  const handleSubscribeEvents = () => {
    if (!byeByeStore) return;
    byeByeStore.subscribeToHelloEvents();
  };

  return (
    <ByeByeContainer>
      ByeBye from the plugin. 👋
      <ControlsRow>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <StyledDiv1>Color defined by - Base App CommonStyle theme</StyledDiv1>
          <StyledDiv2>Color defined by - Plugin themeStyle theme</StyledDiv2>
          <CounterButton onClick={handleClick}>
            Counter Increase 
          </CounterButton>
          <CountLabel>Count: {count}</CountLabel>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              placeholder="user id"
            />
            <CounterButton onClick={handleFetchUser}>Get User Profile</CounterButton>
          </div>

          <div style={{ marginTop: 8 }}>
            {userStore && userStore.user ? (
              <div>
                <div><strong>Name:</strong> {userStore.user.name}</div>
                {userStore.user.role && (
                  <div><strong>Role:</strong> {userStore.user.role.name} ({userStore.user.role.key})</div>
                )}
              </div>
            ) : (
              <div>No user profile loaded.</div>
            )}
          </div>

          {/* Event button: subscribe to hello events on demand */}
          <div style={{ marginTop: 8 }}>
            <CounterButton
              onClick={handleSubscribeEvents}
              disabled={byeByeStore?.subscribedToHello}
            >
              {byeByeStore?.subscribedToHello ? 'Subscribed' : 'Event Button'}
            </CounterButton>
          </div>

        </div>
      </ControlsRow>
      <input
        type="text"
        value={helloStore.name}
        onChange={e => helloStore.setName(e.target.value)}
      />
      <p>{byeByeStore.helloEventMessage}</p>
    </ByeByeContainer>
  );
}

export default observer(ByeBye);
