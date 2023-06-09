import { ReactNode, useEffect, useState } from "react";
import { createGlobalStyle, ThemeContext } from "styled-components";
import { Container } from "./styles";
import { themes } from "./themes";

import { IdeSimContext, CodeState, PreviewState } from "./Context";
import { Theme } from "./themes/type";
import { Code } from "./Code/Code";

import { createSetter, TypingBehaviour } from "./types";
import { Animation } from "./PYYNE/animation/engine";
import { StatusBar } from "./Previews/StatusBar/StatusBar";
import { Preview } from "./Previews/Preview";

interface Props {
  id?: string;

  theme: keyof typeof themes | typeof themes[keyof typeof themes];
  language: string;
  children: ReactNode;

  editable?: boolean;
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

  editable,
}: Props) {
  const codeContent =
    children instanceof Array
      ? children.filter((child) => typeof child === "string").join("\n")
      : typeof children === "string"
      ? children
      : "";

  const secondaryComponent =
    children instanceof Array
      ? children.filter((child) => typeof child !== "string")
      : typeof children !== "string"
      ? children
      : null;

  const _halt = useState(animation?.halt?.[0] ?? false);
  const interval = useState(50);
  const [code, _setCode] = useState<CodeState[0]>({
    focus: true,
    content: animation ? `` : codeContent,
    editable: false,
    colours: {},

    cursorPosition: { x: 0, y: 0 },
  });
  const [preview, _setPreview] = useState<PreviewState[0]>({
    terminal: {
      content: "",
    },
  });

  const setCode = createSetter(_setCode);
  const setPreview = createSetter(_setPreview);
  const theme = useState(typeof _theme === "string" ? themes[_theme] : _theme);

  const halt = animation?.halt ?? _halt;

  useEffect(() => {
    setCode("editable", editable);
  }, [editable]);

  useEffect(() => {
    theme[1](typeof _theme === "string" ? themes[_theme] : _theme);
  }, [_theme]);

  return (
    <Animation id={id} halt={halt} interval={interval}>
      <IdeSimContext.Provider
        value={{
          theme,
          halt,
          interval,
          code: [code, setCode],
          preview: [preview, setPreview],
        }}
      >
        <GlobalStyle />
        <ThemeContext.Provider value={theme[0] as Theme}>
          <Container>
            <Code
              full={!secondaryComponent}
              colours={theme[0].code.text}
              typing={animation}
              language={language}
            >
              {codeContent}
            </Code>

            <StatusBar position={code.cursorPosition} />

            {secondaryComponent && <Preview>{secondaryComponent}</Preview>}
          </Container>
        </ThemeContext.Provider>
      </IdeSimContext.Provider>
    </Animation>
  );
}
