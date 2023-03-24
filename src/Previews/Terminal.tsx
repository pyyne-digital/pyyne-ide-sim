import { codeProcessor } from "helpers";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
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

  const [input, setInput] = useState(false);
  const _lines = useMemo(codeProcessor(preview.terminal!.content), [
      preview.terminal!.content,
    ]),
    lines = _lines.filter((x, i) => (i && i !== _lines.length - 1) || x);

  useEffect(() => {
    children.reduce((index, line) => {
      const r = Math.ceil(Math.random() * 1000000),
        delay = line.delay || 0,
        toggleInput = (v: boolean, index: number, delay = 0) =>
          insert("terminal", ({ clock }) => ({
            id: `inputchange-${r}-${index}`,
            triggers: {
              time: clock + index + delay,
            },
            function: () => {
              setInput(v);
            },
          })),
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
        toggleInput(true, index, delay);

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
      } else {
        toggleInput(false, index, delay);
        output(line.content, index, delay);
      }

      return index + delay + dt + 1;
    }, 0);

    return () => {
      remove("terminal");
    };
  }, [children]);

  useEffect(() => {
    if (children[0]?.type === "input") setInput(true);
  }, []);

  return (
    <ContentContainer ref={ref}>
      {lines.map((content, i) => (
        <Line
          key={i}
          typingInterval={0}
          last={i === lines.length - 1 && input}
          thinCaret={false}
        >
          {content}
        </Line>
      ))}
    </ContentContainer>
  );
}
