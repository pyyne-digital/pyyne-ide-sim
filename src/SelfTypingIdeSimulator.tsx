import { themes } from "./themes";
import { createGlobalStyle } from "styled-components";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { Container } from "./styles";

import { Code } from "./Code/Code";
import { Preview } from "./Previews/Preview";
import { ThemeContext } from "styled-components";
import { Theme } from "./themes/type";
import { StatusBar } from "./Previews/StatusBar/StatusBar";
import { Position } from "./interfaces/Position";

import { codeProcessor } from "helpers";
import { IdeSimContext, defaultContext } from "./Context";

type AnimationParams = {
  content: string;
  position: Position;
};

interface Props {
  theme: keyof typeof themes | typeof themes[keyof typeof themes];
  language: string;
  children: [string, ReactNode];

  animation?: (lines: string[], params: AnimationParams) => string;

  context: typeof defaultContext;
}

export function SelfTypingIdeSimulator({
  theme: _theme,
  children: [code, ...children],
  language = "javascript",
  animation,

  context,
}: Props) {
  const [content, setContent] = useState(``);

  const theme =
    context.theme?.[0] ||
    (typeof _theme === "string" ? themes[_theme] : _theme);

  const GlobalStyle = createGlobalStyle`
    .pyyne-code-editor * {
      font-family: monospace;
    }
  `;

  const codeLines = useMemo(codeProcessor(content, language), [content]);
  const x = useMemo(() => codeLines.at(-1)?.length || 0, [codeLines]);
  const y = useMemo(() => codeLines.length, [codeLines]);

  useEffect(() => {
    setTimeout(() => {
      setContent((previous) => code.substring(0, previous.length + 1));
    }, Math.random() * 100);
  }, [code, content]);

  return (
    <IdeSimContext.Provider value={context}>
      <GlobalStyle />
      <ThemeContext.Provider value={theme as Theme}>
        <Container className="pyyne-code-editor">
          <Code
            position={{ x, y }}
            colours={theme.code.text}
            lines={codeLines}
          />
          <StatusBar position={{ x, y }} lines={codeLines} />
          {children && <Preview>{children}</Preview>}
        </Container>
      </ThemeContext.Provider>
    </IdeSimContext.Provider>
  );
}
