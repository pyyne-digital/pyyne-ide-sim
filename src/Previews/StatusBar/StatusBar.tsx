import styled from "styled-components";
import { Position } from "../../interfaces/Position";
import { Container, EditorStats, FilePath } from "./styles";

interface Props {
  zoom?: number;
  position: Position;
  lines: Array<string>;
}

const Spaced = styled.div`
  width: 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function StatusBar({
  zoom = 100,
  position = { x: 0, y: 0 },
  lines = [],
}: Props) {
  return (
    <Container>
      <FilePath />

      <EditorStats>
        <Spaced>
          <p>ln</p>
          <p>
            {position.y}:{position.x}
          </p>
          <p>col</p>
        </Spaced>

        <p>{zoom}%</p>
      </EditorStats>
    </Container>
  );
}
