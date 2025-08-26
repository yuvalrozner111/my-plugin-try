import viteLogo from '/burger-1-svgrepo-com.svg'
import './App.css'
import { useState } from "react";
import { plugins, pluginById } from "./plugin-loader"; // from Step 1
import PluginBar from "./plugin-ui/PluginBar";
import PluginOutlet from "./plugin-ui/PluginOutlet";
import { ThemeProvider } from 'styled-components';
import { AppCommonStyles } from './CommonStyles';
import { GlobalStyle } from './App.style.js';

function App() {
  const [activeId, setActiveId] = useState(null);
  const [theme, setTheme] = useState('light');

  const handlePluginClicked = (id) => {
    setActiveId(id === activeId ? null : id);
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? AppCommonStyles.lightTheme : AppCommonStyles.darkTheme;
  const themeProps = { ...currentTheme, ...AppCommonStyles.commonStyleProps };

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
