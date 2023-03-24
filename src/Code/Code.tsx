/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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

  const [scrollLock, setScrollLock] = useState(false);
  const [userScrolling, setUserScrolling] = useState(false);

  const lines = useMemo(codeProcessor(code.content, language), [code.content]);

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
      y: lines.length,
      x:
        code.content
          .split("\n")
          .filter((x) => x)
          .at(-1)
          ?.trim().length || 0,
    });
  }, [code.content, lines]);

  useEffect(() => {
    if (scrollLock || userScrolling) return;

    setScrollLock(true);

    if (!userScrolling)
      ref.current?.scroll({
        top: ref.current?.scrollHeight,
      });

    setScrollLock(false);
  }, [scrollLock, userScrolling, lines]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (scrollLock) return;

    const { current } = ref || {};
    if (!current) return;

    setUserScrolling(
      current.scrollTop < current.scrollHeight - current.offsetHeight
    );
  };

  return (
    <Container ref={ref!} full={full} colours={colours} onScroll={handleScroll}>
      {lines
        .filter((x, i) => (i && i !== lines.length - 1) || x)
        .map((piece, i) => (
          <Line
            key={i}
            ref={lastLineRef}
            number={i + 1}
            last={i === lines.length - 1}
            caretRef={caretRef}
            thinCaret
          >
            {piece}
          </Line>
        ))}
    </Container>
  );
}
