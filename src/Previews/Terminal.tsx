import { codeProcessor } from "helpers";
import { useMemo } from "react";
import { Line } from "../Line/Line";
import { ContentContainer } from "./styles";

interface Props {
  children: string;
}

export function Terminal({ children: text }: Props) {
  const lines = useMemo(codeProcessor(text), [text]);

  return (
    <ContentContainer>
      {lines
        .filter((x, i) => (i && i !== lines.length - 1) || x)
        .map((piece, i) => (
          <Line key={i}>{piece}</Line>
        ))}
    </ContentContainer>
  );
}
