import { Position } from "../../interfaces/Position";
import { Container, EditorStats, FilePath } from "./styles";

interface Props {
  zoom?: number;
  position: Position;
  lines: Array<string>;
}

export function StatusBar({
  zoom = 100,
  position = { x: 0, y: 0 },
  lines = [],
}: Props) {
  return (
    <Container>
      <FilePath />

      <EditorStats>
        <p>{zoom}%</p>
        <p>
          {position.y}/{lines.length} ln : col {position.x}
        </p>
      </EditorStats>
    </Container>
  );
}
