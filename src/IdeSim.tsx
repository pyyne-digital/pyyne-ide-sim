import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createGlobalStyle, ThemeContext } from "styled-components";
import { Container } from "./styles";
import { themes } from "./themes";

import { IdeSimContext, CodeStateObject } from "./Context";
import { Theme } from "./themes/type";
import { Code } from "./Code/Code";

import { TypingBehaviour } from "./types";

interface Props {
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

function createSetter<T>(setFunction: Dispatch<SetStateAction<T>>) {
  return (
    key: keyof T,
    value: T[typeof key] | ((value: T[typeof key]) => T[typeof key])
  ) =>
    setFunction((previous) => ({
      ...previous,
      [key]:
        typeof value === "function"
          ? (value as (value: T[typeof key]) => T[typeof key])(previous[key])
          : value,
    }));
}

export function IdeSim({
  theme: _theme,
  children,
  language = "javascript",
  animation,
}: Props) {
  const codeContent =
    children instanceof Array
      ? children.filter((child) => typeof child === "string").join("\n")
      : typeof children === "string"
      ? children
      : "";

  const [code, _setCode] = useState<CodeStateObject>({
    content: animation ? `` : codeContent,
    editable: false,
    colours: {},

    cursorPosition: { x: 0, y: 0 },
  });

  const setCode = createSetter(_setCode);
  const theme = useState(typeof _theme === "string" ? themes[_theme] : _theme);

  return (
    <IdeSimContext.Provider value={{ theme, code: [code, setCode] }}>
      <GlobalStyle />
      <ThemeContext.Provider value={theme[0] as Theme}>
        <Container>
          <Code full colours={theme[0].code.text} typing={animation}>
            {codeContent}
          </Code>
        </Container>
      </ThemeContext.Provider>
    </IdeSimContext.Provider>
  );
}
