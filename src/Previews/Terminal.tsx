import { codeProcessor } from "helpers";
import { useContext, useEffect, useMemo, useRef } from "react";
import { IdeSimContext } from "../Context";
import { Line } from "../Line/Line";
import { AnimationEngineContext } from "../PYYNE/animation/engine";
import { ContentContainer } from "./styles";
import { TerminalLine } from "./Terminal/props";

interface Props {
  children: TerminalLine[];
}

export function Terminal({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null!);

  const { insert, remove } = useContext(AnimationEngineContext);
  const {
    preview: [preview, setPreview],
  } = useContext(IdeSimContext);

  const lines = useMemo(codeProcessor(preview.terminal!.content), [
    preview.terminal!.content,
  ]);

  useEffect(() => {
    children.reduce((index, line) => {
      const r = Math.ceil(Math.random() * 1000000),
        delay = line.delay || 0,
        output = (string: string, index: number, delay = 0) =>
          insert("terminal", ({ clock }) => ({
            id: `content-${r}-${index - 1}`,
            triggers: {
              time: clock + index + delay,
            },
            function: () => {
              setPreview("terminal", ({ content } = { content: "" }) => ({
                content: content + "\n" + string,
              }));
            },
          }));

      let dt = 0;

      if (line.type === "input") {
        if (line.pre) output(line.pre, index, ++dt);

        dt = line.content.split("").reduce(
          (index, c) =>
            insert("terminal", ({ clock }) => ({
              id: `content-${r}-${index}`,
              triggers: {
                time: clock + index + delay + 1,
              },
              function: () => {
                setPreview("terminal", ({ content } = { content: "" }) => ({
                  content: content + c,
                }));
              },
            })) && index + 1,
          index
        );

        if (line.pos) output(line.pos, index + dt, delay);
      } else output(line.content, index, delay);

      return index + dt + 1;
    }, 0);

    return () => {
      remove("terminal");
    };
  }, [children]);

  return (
    <ContentContainer ref={ref}>
      {lines
        .filter((x, i) => (i && i !== lines.length - 1) || x)
        .map((content, i) => (
          <Line key={i} typingInterval={0}>
            {content}
          </Line>
        ))}
    </ContentContainer>
  );
}
