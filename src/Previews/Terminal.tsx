import { codeProcessor } from "helpers";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { IdeSimContext } from "../Context";
import { Line, Caret } from "../Line/Line";
import { AnimationEngineContext } from "../PYYNE/animation/engine";
import { ContentContainer } from "./styles";
import { TerminalLine } from "./Terminal/props";

interface Props {
  children: TerminalLine[];
}

export function Terminal({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null!);

  const { engine } = useContext(AnimationEngineContext);
  const {
    code: [, setCode],
    preview: [preview, setPreview],
  } = useContext(IdeSimContext);

  const [input, setInput] = useState<0 | 1 | 2>(
    children[0].type === "input" ? 1 : 0
  );

  const _lines = useMemo(codeProcessor(preview.terminal!.content), [
      preview.terminal!.content,
    ]),
    lines = _lines.filter((x, i) => (i && i !== _lines.length - 1) || x);

  useEffect(() => {
    children.reduce((index, line) => {
      let dt = 0;

      const r = Math.ceil(Math.random() * 1000000),
        delay = line.delay || 0,
        timer = engine.timer("terminal", (clock) => clock + index + delay);

      const toggleInput = (value: typeof input, { adjustment = 0 } = {}) =>
        timer(`inputchange-${r}-${index}`)(() => setInput(value), adjustment);

      const output = (
        value: string | ((previous: string) => string),
        { offset = 0, adjustment = 0 } = {}
      ) =>
        timer(`content-${r}-${index + offset}`)(
          () =>
            setPreview("terminal", ({ content } = { content: "" }) => ({
              content: content + value,
            })),
          adjustment
        );

      if (line.type === "input") {
        if (line.pre)
          output("\n" + line.pre, { offset: -1, adjustment: -delay + 30 });

        toggleInput(2, { adjustment: index });

        dt = line.content.split("").reduce(
          (index, character) =>
            output(character, {
              offset: index + dt,
              adjustment: index + 30,
            }) && index + 1,
          index
        );

        if (line.pos)
          output(line.pos, { offset: index + dt, adjustment: dt + 50 });
      } else {
        toggleInput(0);
        output("\n" + line.content, { offset: index, adjustment: delay });
      }

      return index + delay + dt + 1;
    }, 0);

    return () => {
      engine.deschedule("terminal");
    };
  }, [children]);

  useEffect(() => {
    setCode("focus", input !== 2);
  }, [input]);

  return (
    <ContentContainer ref={ref}>
      {lines.map((content, i) => (
        <Line
          key={i}
          typingInterval={0}
          caret={
            i === lines.length - 1 &&
            input !== 0 && <Caret hollow={input === 1} />
          }
        >
          {content}
        </Line>
      ))}
    </ContentContainer>
  );
}
