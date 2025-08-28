import { useState } from "react";
import { ByeByeContainer, ControlsRow, CounterButton, CountLabel, StyledDiv1, StyledDiv2 } from "./byebye.style.js";

export default function ByeBye() {
  const [count, setCount] = useState(0);

  return (
    <ByeByeContainer>
      ByeBye from the plugin. 👋
      <ControlsRow style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <StyledDiv1>Color defined by - Base App CommonStyle theme</StyledDiv1>
          <StyledDiv2>Color defined by - Plugin themeStyle theme</StyledDiv2>
          <CounterButton onClick={() => setCount((c) => c + 1)}>
            Increase 
          </CounterButton>
          <CountLabel>Count: {count}</CountLabel>
        </div>

      </ControlsRow>
    </ByeByeContainer>
  );
}
