import { useContext } from "react";
import styled from "styled-components";
import { IdeSimContext } from "../Context";
import { Container } from "./styles";

const Content = styled.p<{ indentation: number }>`
  margin-left: ${({ indentation }) => (indentation || 0) * 10}px;
`;

interface Props {
  number?: number;
  children: string;

  indentation?: number;
}

export function Line({ number, children, indentation = 0 }: Props) {
  const { code } = useContext(IdeSimContext);
  const _indentation = indentation || children.match(/ +/g)?.[0].length || 0;

  return (
    <Container>
      {number && <p className="line-number">{number}</p>}
      <Content
        className="line-content"
        indentation={_indentation}
        contentEditable={code.editable}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </Container>
  );
}
