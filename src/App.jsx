import viteLogo from '/burger-1-svgrepo-com.svg'
import './App.css'
import { useState } from "react";
import { plugins, pluginById } from "./plugin-loader"; // from Step 1
import PluginBar from "./plugin-ui/PluginBar";
import PluginOutlet from "./plugin-ui/PluginOutlet";

function App() {
  const [activeId, setActiveId] = useState(null);

  const handlePluginClicked = (id) => {
    setActiveId(id === activeId ? null : id);
  }

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>PluginApp</h1>
      <PluginBar plugins={plugins} activeId={activeId} onSelect={handlePluginClicked} />
      <PluginOutlet plugin={pluginById[activeId]} />
    </>
  )
}

export default App
