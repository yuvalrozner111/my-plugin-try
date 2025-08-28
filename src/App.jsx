import viteLogo from '/burger-1-svgrepo-com.svg'
import { useState, useEffect } from "react";
import { plugins, pluginById } from "./plugin-loader";
import PluginBar from "./plugin-host/PluginBar";
import PluginOutlet from "./plugin-host/PluginOutlet";
import { ThemeProvider } from 'styled-components';
import AppCommonsStyles from './CommonStyles';
import { AppContainer, ButtonContainer, IconButton } from './App.style.js';
import { FaGithub, FaBrain } from 'react-icons/fa';

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

  return (
    <ThemeProvider theme={themeProps}>
      <AppContainer>
        <img src={viteLogo} className="logo" alt="Vite logo" />

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
        </ButtonContainer>
        <h1>PluginApp</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
        <PluginBar plugins={plugins} activeId={activeId} onSelect={handlePluginClicked} />
        <PluginOutlet plugin={pluginById[activeId]} />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
