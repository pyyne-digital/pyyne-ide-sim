import { useState } from "react";
import { Playground } from "../interfaces/Playground";
import { Animation } from "components/pyyne-animation-engine";

import * as IdeSim from "../";
// import { TerminalLine } from "../Previews/Terminal/props";

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

  return (
    <Playground.Container>
      <Animation id="code">
        <Playground.Showcase onSizeChange={setSize}>
          <IdeSim.Component
            theme="PYYNE"
            language="typescript"
            animation={{ speed: 1, timidness: 1, confidence: 1 }}
          >
            {code}

            {/* <IdeSim.Previews.Terminal>{terminalText}</IdeSim.Previews.Terminal> */}
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
      </Animation>
    </Playground.Container>
  );
}
