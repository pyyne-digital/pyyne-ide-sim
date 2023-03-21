import { themes } from "./themes";
import { createGlobalStyle } from "styled-components";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { Container } from "./styles";

import { Code } from "./Code/Code";
import { Preview } from "./Previews/Preview";
import { ThemeContext } from "styled-components";
import { Theme } from "./themes/type";
import { StatusBar } from "./Previews/StatusBar/StatusBar";

import { codeProcessor } from "helpers";
import { IdeSimContext, defaultContext } from "./Context";

import { TypingBehaviour, Animation, AnimationEvent } from "./types";

interface Props {
  theme: keyof typeof themes | typeof themes[keyof typeof themes];
  language: string;
  children: [string, ReactNode];

  context: Omit<typeof defaultContext, "animation"> & {
    animation?: Omit<Animation, "clock">;
  };
}

export function SelfTypingIdeSimulator({
  theme: _theme,
  children: [code, ...children],
  language = "javascript",

  context,
}: Props) {
  const [clock, setClock] = useState(0);
  const [content, setContent] = useState(``);
  const [animationEvents, setAnimationEvents] = useState<AnimationEvent[]>([]);

  const { interval = 50 } = context.animation || {};

  const {
    speed = 50,
    timidness = 0,
    confidence = 1,
  } = context.animation?.behaviour || {};

  const theme =
    context.theme?.[0] ||
    (typeof _theme === "string" ? themes[_theme] : _theme);

  const GlobalStyle = createGlobalStyle`
    .pyyne-code-editor * {
      font-family: monospace;
    }
  `;

  const codeLines = useMemo(codeProcessor(content, language), [content]);
  const { x, y } = useMemo(
    () => ({
      x: content.split("\n").at(-1)?.trim().length || 0,
      y: codeLines.length,
    }),
    [codeLines]
  );

  useEffect(() => {
    if (context.animation) {
      const tick = setInterval(() => {
        setClock((currentTime) => {
          setAnimationEvents((events) => {
            const gone = events.filter((event) => event.time === currentTime);
            gone.forEach(({ event }) => event());

            return events.filter(({ time }) => time > currentTime);
          });

          return currentTime + 1;
        });
      }, interval);

      return () => {
        clearInterval(tick);
      };
    }
  }, [context.animation]);

  useEffect(() => {
    if (context.animation)
      setAnimationEvents(
        code.split("").map((character, index) => ({
          time: Math.floor(
            clock +
              (index * 2) / speed +
              Math.round(Math.random() * (timidness / confidence))
          ),
          event: () => {
            setContent((previous) => code.substring(0, previous.length + 1));
          },
        }))
      );
    else setContent(code);
  }, [context.animation, code]);

  return (
    <IdeSimContext.Provider
      value={{
        ...context,
        animation: context.animation
          ? { ...context.animation, clock }
          : undefined,
      }}
    >
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
