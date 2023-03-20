import { useEffect, useRef, useState } from "react";
import { Line } from "../Line/Line";
import { ContentContainer } from "./styles";
import { TerminalLine } from "./Terminal/props";

interface Props {
  children: TerminalLine[];
}

export function Terminal({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null!);
  const [lines, setLines] = useState<TerminalLine[]>([]);

  let timeout = 0;

  useEffect(() => {
    children.forEach((line, index) => {
      const previous = index ? children[index - 1] : null;
      const { delay = 1000, interval = 100 } = line.animation || {};

      setTimeout(() => {
        setLines((current) => [...current, line]);
      }, timeout);

      timeout +=
        delay +
        (previous?.type === "input"
          ? previous.content.length * (previous.animation?.interval || interval)
          : delay);
    });
  }, [children]);

  useEffect(() => {
    ref.current?.scroll({
      top: 2147483647,
    });
  }, [lines]);

  return (
    <ContentContainer ref={ref}>
      {lines
        .filter((x, i) => (i && i !== lines.length - 1) || x)
        .map(({ type, content, animation }, i) => (
          <Line
            key={i}
            typingInterval={type === "input" ? animation?.interval : 0}
          >
            {content}
          </Line>
        ))}
    </ContentContainer>
  );
}
