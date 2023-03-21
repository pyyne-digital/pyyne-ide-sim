import { useState } from "react";
import { Playground } from "../interfaces/Playground";

import * as IdeSim from "../";
import { TerminalLine } from "../Previews/Terminal/props";

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

  const [terminalText, setTerminalText] = useState<TerminalLine[]>(
    data.terminalOutput.split("\n").map((text, i) => {
      const type = !i ? "input" : "output";
      return {
        content: text,
        type,
        animation: {
          delay: i === 1 ? 0 : Math.random() * 2000,
          interval: 100,
        },
      } as TerminalLine;
    })
  );

  return (
    <Playground.Container>
      <Playground.Showcase onSizeChange={setSize}>
        <IdeSim.SelfTypingIdeSimulator
          theme="PYYNE"
          language="typescript"
          context={{
            theme,
            code: { editable, colours: {}, content: code },
            preview: { terminal: { content: terminalText } },
            animation: {
              interval: 30,
              behaviour: {
                speed: 1,
                timidness: 1,
                confidence: 1,
              },
            },
          }}
        >
          {code}

          <IdeSim.Previews.Terminal>{terminalText}</IdeSim.Previews.Terminal>
        </IdeSim.SelfTypingIdeSimulator>
      </Playground.Showcase>

      <Playground.ControlPanel>
        <IdeSim.Playground.ControlPanel
          theme={theme}
          width={width}
          height={height}
          editableState={[editable, setEditable]}
          codeState={[code, setCode]}
          colourControlsState={[showColourControls, setShowColourControls]}
          terminalTextState={[terminalText, setTerminalText]}
        />
      </Playground.ControlPanel>
    </Playground.Container>
  );
}
