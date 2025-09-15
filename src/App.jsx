import viteLogo from '/burger-1-svgrepo-com.svg'
import { useState, useEffect } from "react";
import PluginBar from "./plugin-host/PluginBar";
import PluginOutlet from "./plugin-host/PluginOutlet";
import { ThemeProvider } from 'styled-components';
import AppCommonsStyles from './styles/CommonStyles.js';
import { GlobalStyle } from './styles/GlobalStyle.js';
import { AppContainer, ButtonContainer, IconButton, AppTitle, LogoContainer, ThemeButton } from './styles/App.style.js';
import { FaGithub, FaBrain } from 'react-icons/fa';
import { pluginById, plugins } from './plugin-host/plugin-loader.js';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useStores_ } from './hooks/useStores.js';
import { supportedLanguages } from './config/i18n.js';
import { STRINGS } from './constants/internal.js';
import FormatMessage from './components/common/FormatMessage.jsx'

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

  const { t, i18n: i18nInstance } = useTranslation();
  const [language, setLanguage] = useState(i18nInstance.language || 'he');

  const changeLanguage = (lng) => {
    i18nInstance.changeLanguage(lng);
    setLanguage(lng);
  }

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

      <label htmlFor='lang-select' style={{ marginLeft: '10px' }}>Language:</label>
      <select
        id='lang-select'
        value={language}
        onChange={e => changeLanguage(e.target.value)}
        aria-label="Select language"
      >
        {supportedLanguages.map(lang => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <label htmlFor='theme-select' style={{ marginLeft: '10px' }}>Theme:</label>
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
            <p>{t(STRINGS.WELCOME_TITLE)}, {userStore.user.name}!</p>
            <button onClick={() => userStore.logout()}>Logout</button>
          </div>
        ) : (
          <div>
            <p>{t(STRINGS.DOUBLE_STRING)}</p>
            <p><FormatMessage id={STRINGS.LOGGEDOUT_TITLE} /></p>
            <button onClick={() => userStore.login('Yuval')}>Login as Yuval</button>
          </div>
        )}
      </div>
        {getButtonContainer()}
        <PluginBar plugins={plugins} activeId={activeId} onSelect={handlePluginClicked} />
        <PluginOutlet plugin={pluginById[activeId]} key={activeId} />
      </AppContainer>
    </ThemeProvider>
  )
}

export default observer(App);
