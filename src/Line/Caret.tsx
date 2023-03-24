import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  thin?: boolean;
  content: string;
}

const Element = styled.span<{ thin?: boolean }>`
  background-color: white;
  width: ${({ thin }) => `${thin ? 3 : 9}px`};
  height: 18px;
  padding: 0;
`;

export const Caret = forwardRef(
  ({ content, thin }: Props, fref: ForwardedRef<HTMLSpanElement>) => {
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

    return blink ? <Element ref={fref} thin={thin} /> : null;
  }
);
