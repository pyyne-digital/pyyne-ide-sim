import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  content: string;
}

const Element = styled.span`
  color: white;
  font-size: 18px;

  margin: -5px -5px 0 -5px;
  padding: 0;
`;

export const Caret = forwardRef(
  ({ content }: Props, fref: ForwardedRef<HTMLSpanElement>) => {
    const [blink, setBlink] = useState(true);
    const [, setContent] = useState(content);

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

    return blink ? <Element ref={fref}>|</Element> : null;
  }
);
