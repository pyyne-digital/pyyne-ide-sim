import { useState } from "react";
import { Playground } from "../interfaces/Playground";

import * as IdeSim from "../";

import * as data from "./data";

interface Props {
  Playground: Playground;
}

export function Example({ Playground }: Props) {
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [editable, setEditable] = useState(false);
  const [showColourControls, setShowColourControls] = useState(false);
  const theme = useState(IdeSim.themes.PYYNE);

  const [code, setCode] = useState(data.code);
  const [terminalText, setTerminalText] = useState(data.terminalOutput);

  return (
    <Playground.Container>
      <Playground.Showcase onSizeChange={setSize}>
        <IdeSim.Component
          theme="PYYNE"
          language="typescript"
          animation={{ speed: 1, timidness: 1, confidence: 1 }}
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
