import { useState } from "react";

import * as IdeSim from "../";
import * as data from "./data";

import { Playground } from "../interfaces/Playground";

interface Props {
  Playground: Playground;
}

export function Example({ Playground }: Props) {
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [editable, setEditable] = useState(false);
  const [showColourControls, setShowColourControls] = useState(true);
  const theme = useState(IdeSim.themes.PYYNE);

  const [code, setCode] = useState(localStorage.code || data.code);
  const [terminalText] = useState(data.terminalOutput);

  return (
    <Playground.Container>
      <Playground.Showcase onSizeChange={setSize}>
        <IdeSim.Component
          theme={theme[0]}
          language="typescript"
          animation={{ speed: 1, timidness: 1, confidence: 1 }}
          editable={editable}
        >
          {code}

          <IdeSim.Previews.Terminal>{terminalText}</IdeSim.Previews.Terminal>
        </IdeSim.Component>
      </Playground.Showcase>

      <Playground.ControlPanel>
        <IdeSim.Playground.ControlPanel
          theme={theme}
          width={width}
          height={height}
          editableState={[editable, setEditable]}
          codeState={[code, setCode]}
          colourControlsState={[showColourControls, setShowColourControls]}
          terminalTextState={null!}
        />
      </Playground.ControlPanel>
    </Playground.Container>
  );
}
