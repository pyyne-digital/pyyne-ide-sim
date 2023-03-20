import { Line } from "../Line/Line";
import { ColourTypes } from "./coloursType";
import { Container } from "./styles";

interface Props {
  lines: string[];
  colours: ColourTypes;
}

export function Code({ colours, lines }: Props) {
  return (
    <Container colours={colours}>
      {lines
        .filter((x, i) => (i && i !== lines.length - 1) || x)
        .map((piece, i) => (
          <Line key={i} number={i + 1}>
            {piece}
          </Line>
        ))}
    </Container>
  );
}
