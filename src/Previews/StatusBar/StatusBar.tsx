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
        <p>
          {position.y}:{position.x}
        </p>
        <p>{zoom}%</p>
      </EditorStats>
    </Container>
  );
}
