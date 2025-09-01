import viteLogo from '/burger-1-svgrepo-com.svg'
import { useState, useEffect } from "react";
import PluginBar from "./plugin-host/PluginBar";
import PluginOutlet from "./plugin-host/PluginOutlet";
import { ThemeProvider } from 'styled-components';
import AppCommonsStyles from './CommonStyles';
import { GlobalStyle } from './App.style.js';
import { AppContainer, ButtonContainer, IconButton, AppTitle, LogoContainer, ThemeButton } from './App.style.js';
import { FaGithub, FaBrain } from 'react-icons/fa';
import { pluginById, plugins } from './plugin-host/plugin-loader.js';

import { observer } from 'mobx-react';
import { useStores_ } from './stores';

function App() {
  const getInitialTheme = () => {
    try {
      return sessionStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  };

  const [activeId, setActiveId] = useState(null);
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    try {
      sessionStorage.setItem('theme', theme);
    } catch {
      // ignore write errors (e.g., private mode)
    }
  }, [theme]);

  const handlePluginClicked = (id) => {
    setActiveId(id === activeId ? null : id);
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? AppCommonsStyles.lightTheme : AppCommonsStyles.darkTheme;
  const themeProps = { ...currentTheme, ...AppCommonsStyles.commonStyleProps };

  const { userStore } = useStores_();
  const { pluginStore } = useStores_();
  const helloStore = pluginStore.getStore('hello');

  const getButtonContainer = () => { return (
    <ButtonContainer>
      <IconButton
        href="https://github.com/yuvalrozner111/my-plugin-try"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open project on GitHub"
      >
        <FaGithub size={18} aria-hidden="true" />
        <span>GitHub</span>
      </IconButton>

      <IconButton
        href="https://jules.google.com/task?repo=yuvalrozner111%2Fmy-plugin-try"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open project in Jules"
      >
        <FaBrain size={18} aria-hidden="true" />
        <span>Jules</span>
      </IconButton>

      <ThemeButton onClick={toggleTheme}>
      </ThemeButton>
      <input
        type="text"
        value={helloStore.name}
        onChange={e => helloStore.setName(e.target.value)}
      />
    </ButtonContainer>
  )};

  return (
    <ThemeProvider theme={themeProps}>
      <GlobalStyle />
      <AppContainer>
        <LogoContainer src={viteLogo} alt="Logo" />
        <AppTitle>PluginApp</AppTitle>
        <div>
        {userStore.isLoggedIn ? (
          <div>
            <p>Welcome, {userStore.user.name}!</p>
            <button onClick={() => userStore.logout()}>Logout</button>
          </div>
        ) : (
          <div>
            <p>You are not logged in.</p>
            <button onClick={() => userStore.login('Yuval')}>Login as Yuval</button>
          </div>
        )}
      </div>
        {getButtonContainer()}
        <PluginBar plugins={plugins} activeId={activeId} onSelect={handlePluginClicked} />
        <PluginOutlet plugin={pluginById[activeId]} />
      </AppContainer>
    </ThemeProvider>
  )
}

export default observer(App);
