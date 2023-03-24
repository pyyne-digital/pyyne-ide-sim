/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useMemo, useRef } from "react";
import { TypingBehaviour } from "../types";
import { IdeSimContext } from "../Context";
import { codeProcessor } from "../helpers";

import { Container } from "./styles";
import { AnimationEngineContext } from "../PYYNE/animation/engine";

import { Line } from "../Line/Line";
import { ColourTypes } from "./coloursType";

interface Props {
  children: string;
  language?: string;
  colours: ColourTypes;

  typing?: TypingBehaviour;

  full?: boolean;
}

export function Code({
  colours,
  children,
  language = "typescript",
  typing,
  full,
}: Props) {
  const {
    code: [code, setCode],
  } = useContext(IdeSimContext);

  const { insert, remove } = useContext(AnimationEngineContext);

  const ref = useRef<HTMLDivElement>(null!);
  const caretRef = useRef<HTMLSpanElement>(null!);
  const lastLineRef = useRef<HTMLParagraphElement>(null!);

  const lines = useMemo(codeProcessor(code.content, language), [code.content]);
  // const { speed = 50, timidness = 0, confidence = 1 } = typing || {};

  useEffect(() => {
    if (!typing) return setCode("content", children);

    children.split("").forEach((character, index) => {
      insert("code", ({ clock }) => ({
        id: `content-${index}`,
        triggers: {
          time: clock + index + 1,
        },
        function: () => {
          setCode("content", (previous) => previous + character);
        },
      }));
    });

    return () => {
      remove("code");
    };
  }, [children]);

  useEffect(() => {
    setCode("cursorPosition", {
      x: code.content.split("\n").at(-1)?.trim().length || 0,
      y: lines.length,
    });
  }, [code.content, lines]);

  return (
    <Container ref={ref!} colours={colours} full={full}>
      {lines
        .filter((x, i) => (i && i !== lines.length - 1) || x)
        .map((piece, i) => (
          <Line
            key={i}
            ref={lastLineRef}
            number={i + 1}
            last={i === lines.length - 1}
            caretRef={caretRef}
          >
            {piece}
          </Line>
        ))}
    </Container>
  );
}
