import { AnimationEngineContext } from "components/pyyne-animation-engine";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { IdeSimContext } from "../Context";
import { codeProcessor } from "../helpers";
import { Position } from "../interfaces/Position";
import { Line } from "../Line/Line";
import { TypingBehaviour } from "../types";
import { ColourTypes } from "./coloursType";
import { Container } from "./styles";

interface Props {
  children: string;
  language?: string;
  colours: ColourTypes;

  typing?: TypingBehaviour;

  full?: boolean;

  // position: Position;
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
  const { speed = 50, timidness = 0, confidence = 1 } = typing || {};

  const { x, y } = useMemo(
    () => ({
      x: children.split("\n").at(-1)?.trim().length || 0,
      y: lines.length,
    }),
    [lines]
  );

  useEffect(() => {
    console.log("h");
    if (!typing) return setCode("content", children);

    let result = "";

    children.split("").forEach((character, index) => {
      insert("code", ({ clock }) => ({
        id: `content-${index}`,
        triggers: {
          time: clock + index,
        },
        function: () => {
          setCode("content", (previous) => previous + character);
        },
      }));
    });

    return () => {
      remove("code");
    };
  }, [typing, children]);

  // useEffect(() => {
  //   ref.current?.scroll({
  //     top: 2147483647,
  //   });
  // }, [lines]);

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
