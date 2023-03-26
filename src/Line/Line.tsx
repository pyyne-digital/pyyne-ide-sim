import { forwardRef, Ref, useContext } from "react";
import styled from "styled-components";
import { IdeSimContext } from "../Context";
import { Caret } from "./Caret";
import { Container } from "./styles";

const Content = styled.p<{ indentation: number }>`
  margin-left: ${({ indentation }) => (indentation || 0) * 10}px;

  &,
  * {
    white-space: pre !important;
  }
`;

interface Props {
  last?: boolean;
  number?: number;
  children: string;
  typingInterval?: number;

  caret?: any;

  thinCaret?: boolean;
  caretRef?: Ref<HTMLSpanElement>;
  lastLineRef?: Ref<HTMLParagraphElement>;

  indentation?: number;
}

export const Line = forwardRef(
  (
    { last, number, children, indentation = 0, caret }: Props,
    fref: Ref<HTMLParagraphElement>
  ) => {
    const {
      code: [code, setCode],
    } = useContext(IdeSimContext);
    const _indentation = indentation || children.match(/ +/g)?.[0].length || 0;

    return (
      <Container>
        {number && <p className="line-number">{number}</p>}
        <Content
          ref={last ? fref : null}
          className="line-content"
          indentation={_indentation}
          contentEditable={code.editable}
          dangerouslySetInnerHTML={{ __html: children }}
          onFocus={() => setCode("focus", false)}
          onBlur={() => setCode("focus", true)}
        />
        {caret && { ...caret, props: { ...caret.props, content: children } }}
      </Container>
    );
  }
);

export { Caret };
