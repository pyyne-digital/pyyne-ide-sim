import { Dispatch, ReactNode, SetStateAction } from "react";
import * as Colour from "./Colours";

import { themes } from "../..";
import { Theme } from "../../themes/type";

interface Props {
  width: number;
  height: number;

  editableState: [boolean, Dispatch<SetStateAction<boolean>>];
  colourControlsState: [boolean, Dispatch<SetStateAction<boolean>>];

  codeState: [string, Dispatch<SetStateAction<string>>];
  terminalTextState: [string, Dispatch<SetStateAction<string>>];

  theme: [Theme, Dispatch<SetStateAction<Theme>>];
}

export function ControlPanel({
  theme,

  width,
  height,

  editableState: [editable, setEditable],
  colourControlsState: [colours, showColours],

  codeState: [code, setCode],
  terminalTextState: [terminalText, setTerminalText],
}: Props) {
  const renderColourControls =
    (name = "", i = 0, _path = "") =>
    (object: any): ReactNode => {
      const path = _path ? `${_path}.${name}` : name;

      return (
        <Colour.Group indent={i}>
          {name && <h3>{path}</h3>}

          {Object.entries(object).map(([k, v]) =>
            typeof v === "string" ? (
              <Colour.Row name={k} initialValue={v} path={path} theme={theme} />
            ) : (
              renderColourControls(k, i + 1, path)(v)
            )
          )}
        </Colour.Group>
      );
    };

  return (
    <>
      <p>
        Size: {Math.floor(width)}x{Math.floor(height)}
      </p>

      <span>
        <input
          type="checkbox"
          checked={editable}
          onChange={(e) => setEditable(e.target.checked)}
        />
        Editable
      </span>

      <p>Code content:</p>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          fontSize: 11,
          minWidth: 220,
          minHeight: 150,
          whiteSpace: "pre",
        }}
      />

      <p>Terminal content:</p>
      <textarea
        value={terminalText}
        onChange={(e) => setTerminalText(e.target.value)}
        style={{
          fontSize: 11,
          minWidth: 220,
          minHeight: 150,
          whiteSpace: "pre",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>
          <input
            type="checkbox"
            checked={colours}
            onChange={(e) => showColours(e.target.checked)}
          />
          Colours
        </h3>

        {colours && renderColourControls()(themes.PYYNE)}
      </div>
    </>
  );
}
