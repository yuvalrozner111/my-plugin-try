import { useState } from "react";
import { ByeByeContainer, ControlsRow, CounterButton, CountLabel } from "./byebye.style.js";

export default function ByeBye() {
  const [count, setCount] = useState(0);

  return (
    <ByeByeContainer>
      ByeBye from the plugin. 👋
      <ControlsRow>
        <CounterButton onClick={() => setCount((c) => c + 1)}>
          Increase
        </CounterButton>
        <CountLabel>Count: {count}</CountLabel>
      </ControlsRow>
    </ByeByeContainer>
  );
}
