import { forwardRef, Ref, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IdeSimContext } from "../Context";
import { Caret } from "./Caret";
import { Container } from "./styles";

const Content = styled.p<{ indentation: number }>`
  margin-left: ${({ indentation }) => (indentation || 0) * 10}px;
`;

interface Props {
  last?: boolean;
  number?: number;
  children: string;
  typingInterval?: number;

  caretRef?: Ref<HTMLSpanElement>;
  lastLineRef?: Ref<HTMLParagraphElement>;

  indentation?: number;
}

export const Line = forwardRef(
  (
    {
      last,
      number,
      children,
      caretRef,
      indentation = 0,
      typingInterval,
    }: Props,
    fref: Ref<HTMLParagraphElement>
  ) => {
    const { code } = useContext(IdeSimContext);
    const _indentation = indentation || children.match(/ +/g)?.[0].length || 0;

    const [content, setContent] = useState(``);

    useEffect(() => {
      if (typingInterval)
        setTimeout(() => {
          setContent((previous) => children.substring(0, previous.length + 1));
        }, Math.random() * typingInterval);
    }, [code, content]);

    return (
      <Container>
        {number && <p className="line-number">{number}</p>}
        <Content
          ref={last ? fref : null}
          className="line-content"
          indentation={_indentation}
          contentEditable={code.editable}
          dangerouslySetInnerHTML={{
            __html: content || children,
          }}
        />
        {last && !code.editable && <Caret ref={caretRef} content={children} />}
      </Container>
    );
  }
);
