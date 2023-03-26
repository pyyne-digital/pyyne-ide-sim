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

enum InputMode {
  Transparent,
  Hollow,
  Filled,
}

export function Terminal({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null!);

  const { engine } = useContext(AnimationEngineContext);
  const {
    code: [, setCode],
    preview: [preview, setPreview],
  } = useContext(IdeSimContext);

  const [input, setInput] = useState<InputMode>(
    children[0].type === "input" ? InputMode.Hollow : InputMode.Transparent
  );

  const _lines = useMemo(codeProcessor(preview.terminal!.content), [
      preview.terminal!.content,
    ]),
    lines = _lines.filter((x, i) => (i && i !== _lines.length - 1) || x);

  useEffect(() => {
    children.reduce((index, line) => {
      const rid = Math.ceil(Math.random() * 1000000),
        delay = line.delay || 0;

      const registerFrame = engine.buildFrame({
        componentName: "terminal",
        time: (clock) => clock + index + delay,
      });

      const setInputMode = (value: typeof input, timeAdjustment = 0) =>
        registerFrame({
          id: `inputchange-${rid}`,
          fn: () => setInput(value),
          timeAdjustment,
        });

      const print =
        (offset: number, timeAdjustment = 0) =>
        (value: string | ((previous: string) => string)) =>
          registerFrame({
            id: `content-${rid}-${index + offset}`,
            fn: () =>
              setPreview("terminal", ({ content } = { content: "" }) => ({
                content: content + value,
              })),
            timeAdjustment,
          });

      let dt = 0;

      if (line.type === "input") {
        if (line.pre) print(index - 1, -delay + 30)("\n" + line.pre);

        setInputMode(InputMode.Filled);

        dt = line.content
          .split("")
          .reduce((i, c) => print(i + dt, i + 30)(c) && i + 1, index);

        if (line.pos) print(index + dt, dt + 50)(line.pos);
      } else
        setInputMode(InputMode.Transparent) &&
          print(index, delay)("\n" + line.content);

      return index + delay + dt + 1;
    }, 0);

    return () => {
      engine.deschedule("terminal");
    };
  }, [children]);

  useEffect(() => {
    setCode("focus", input !== InputMode.Filled);
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
