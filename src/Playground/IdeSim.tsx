import { useEffect, useState } from "react";
import { Playground } from "../interfaces/Playground";

import * as IdeSim from "../";
import { TerminalLine } from "../Previews/Terminal/props";

interface Props {
  Playground: Playground;
}

const test = `
import { useEffect, useState } from "react";
import { Playground } from "../interfaces/Playground";

import * as IdeSim from "../";

interface Props {
  Playground: Playground;
}

const test = \`
const stripe = require("stripe")("sk_test");

await stripe.paymentIntents.create({
  amount: 2000,
  currency: "usd",
});
\`;

export function Example({ Playground }: Props) {
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [editable, setEditable] = useState(false);
  const [showColourControls, setShowColourControls] = useState(false);
  const theme = useState(IdeSim.themes.PYYNE);

  const [i, si] = useState(0);
  const [code, setCode] = useState(test);

  const [terminalText, setTerminalText] = useState(\`
  $ node server.is && stripe listen
  > Ready! Waiting for requests...
  2023-03-01 14:45:22 [200] payment_intent.created
  2023-03-01 14:45:22 [200] charge.succeeded
  2023-03-01 14:45:22 [200] payment_intent.succeeded
  \`);

  return (
    <Playground.Container>
      <Playground.Showcase onSizeChange={setSize}>
        <IdeSim.SelfTypingIdeSimulator
          theme="PYYNE"
          language="javascript"
          context={{
            theme,
            code: { editable, colours: {}, content: code },
            preview: { terminal: { content: terminalText } },
          }}
        >
          {code}
          <IdeSim.Previews.Terminal>{[]}</IdeSim.Previews.Terminal>
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

`;

export function Example({ Playground }: Props) {
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [editable, setEditable] = useState(false);
  const [showColourControls, setShowColourControls] = useState(false);
  const theme = useState(IdeSim.themes.PYYNE);

  const [code, setCode] = useState(test);

  const [terminalText, setTerminalText] = useState<TerminalLine[]>(
    `$ node server.is && stripe listen
  > Ready! Waiting for requests...
  2023-03-01 14:45:22 [200] payment_intent.created
  2023-03-01 14:45:22 [200] charge.succeeded
  2023-03-01 14:45:22 [200] payment_intent.succeeded
  `
      .split("\n")
      .map((text, i) => {
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
          language="tsx"
          context={{
            theme,
            code: { editable, colours: {}, content: code },
            preview: { terminal: { content: terminalText } },
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
