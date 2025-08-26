import viteLogo from '/burger-1-svgrepo-com.svg'
import { useState, useEffect } from "react";
import { plugins, pluginById } from "./plugin-loader";
import PluginBar from "./plugin-ui/PluginBar";
import PluginOutlet from "./plugin-ui/PluginOutlet";
import { ThemeProvider } from 'styled-components';
import AppCommonsStyles from './CommonStyles';
import { GlobalStyle } from './App.style.js';

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
      <GlobalStyle />
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>PluginApp</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <PluginBar plugins={plugins} activeId={activeId} onSelect={handlePluginClicked} />
      <PluginOutlet plugin={pluginById[activeId]} />
    </ThemeProvider>
  )
}

export default App
