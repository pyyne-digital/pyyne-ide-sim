import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createGlobalStyle, ThemeContext } from "styled-components";
import { Container } from "./styles";
import { themes } from "./themes";

import { IdeSimContext, CodeState } from "./Context";
import { Theme } from "./themes/type";
import { Code } from "./Code/Code";

import { createSetter, TypingBehaviour } from "./types";
import { Animation } from "components/pyyne-animation-engine";

interface Props {
  id?: string;

  theme: keyof typeof themes | typeof themes[keyof typeof themes];
  language: string;
  children: ReactNode;

  animation?: TypingBehaviour;
}

const GlobalStyle = createGlobalStyle`
    .pyyne-code-editor * {
      font-family: monospace;
    }
  `;

export function IdeSim({
  id = "pyyne-ide-sim",

  theme: _theme,
  children,
  language = "typescript",
  animation,
}: Props) {
  const codeContent =
    children instanceof Array
      ? children.filter((child) => typeof child === "string").join("\n")
      : typeof children === "string"
      ? children
      : "";

  const _halt = useState(animation?.halt?.[0] ?? false);
  const interval = useState(50);
  const [code, _setCode] = useState<CodeState[0]>({
    content: animation ? `` : codeContent,
    editable: false,
    colours: {},

    cursorPosition: { x: 0, y: 0 },
  });

  const setCode = createSetter(_setCode);
  const theme = useState(typeof _theme === "string" ? themes[_theme] : _theme);

  const halt = animation?.halt ?? _halt;

  return (
    <Animation id={id} halt={halt} interval={interval}>
      <IdeSimContext.Provider
        value={{ theme, halt, interval, code: [code, setCode] }}
      >
        <GlobalStyle />
        <ThemeContext.Provider value={theme[0] as Theme}>
          <Container>
            <Code
              full
              colours={theme[0].code.text}
              typing={animation}
              language={language}
            >
              {codeContent}
            </Code>
          </Container>
        </ThemeContext.Provider>
      </IdeSimContext.Provider>
    </Animation>
  );
}
