import { useEffect, useRef, useState } from "react";
import { Position } from "../interfaces/Position";
import { Line } from "../Line/Line";
import { ColourTypes } from "./coloursType";
import { Container } from "./styles";

interface Props {
  lines: string[];
  language?: string;
  colours: ColourTypes;

  position: Position;
}

export function Code({ colours, lines, position }: Props) {
  const ref = useRef<HTMLDivElement>(null!);
  const caretRef = useRef<HTMLSpanElement>(null!);
  const lastLineRef = useRef<HTMLParagraphElement>(null!);

  useEffect(() => {
    ref.current?.scroll({
      top: 2147483647,
    });
  }, [lines]);

  return (
    <Container ref={ref!} colours={colours}>
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
