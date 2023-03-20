import { themes } from "./themes";
import { createGlobalStyle } from "styled-components";

import { ReactNode, useMemo, useState } from "react";
import { Container } from "./styles";

import { Code } from "./Code/Code";
import { Preview } from "./Previews/Preview";
import { ThemeContext } from "styled-components";
import { Theme } from "./themes/type";
import { StatusBar } from "./Previews/StatusBar/StatusBar";
import { Position } from "./interfaces/Position";

import { codeProcessor } from "helpers";
import { IdeSimContext, defaultContext } from "./Context";

interface Props {
  theme: keyof typeof themes | typeof themes[keyof typeof themes];
  language: string;
  children: [string, ReactNode];

  context: typeof defaultContext;
}

export function SelfTypingIdeSimulator({
  theme: _theme,
  children: [code, ...children],
  language = "javascript",

  context,
}: Props) {
  const theme =
    context.theme?.[0] ||
    (typeof _theme === "string" ? themes[_theme] : _theme);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const codeLines = useMemo(codeProcessor(code, language), [code]);

  const GlobalStyle = createGlobalStyle`
    .pyyne-code-editor * {
      font-family: monospace;
    }
  `;

  return (
    <IdeSimContext.Provider value={context}>
      <GlobalStyle />
      <ThemeContext.Provider value={theme as Theme}>
        <Container className="pyyne-code-editor">
          <Code colours={theme.code.text} lines={codeLines} />
          <StatusBar position={position} lines={codeLines} />
          {children && <Preview>{children}</Preview>}
        </Container>
      </ThemeContext.Provider>
    </IdeSimContext.Provider>
  );
}
