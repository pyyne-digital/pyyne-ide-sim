import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  thin?: boolean;
  hollow?: boolean;
  content?: string;
}

const Element = styled.span<Partial<Props>>`
  background-color: ${({ hollow }) => (hollow ? "none" : "white")};
  border: ${({ thin }) => !thin && `1px solid white`};
  width: ${({ thin }) => `${thin ? 3 : 7}px`};
  height: ${({ thin }) => (thin ? 18 : 15)}px;
  padding: 0;
`;

export const Caret = forwardRef(
  ({ content, thin, hollow }: Props, fref: ForwardedRef<HTMLSpanElement>) => {
    const [blink, setBlink] = useState(true);
    const [, setContent] = useState(content);

    useEffect(() => {
      setBlink(true);
    }, [content]);

    useEffect(() => {
      const interval = setInterval(() => {
        setContent((currentContent) => {
          if (content === currentContent) setBlink((b) => !b);
          return content;
        });
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }, [content]);

    return blink || !thin ? (
      <Element ref={fref} thin={thin} hollow={hollow} />
    ) : null;
  }
);
