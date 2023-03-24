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
    halt: [halt, setHalt],
    preview: [preview, setPreview],
  } = useContext(IdeSimContext);

  // const [lines, setLines] = useState<TerminalLine[]>([]);
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

      // insert("terminal", ({ clock }) =>
      //    {
      //         id: `terminal-content-${index}`,
      //         triggers: line.type === "input"
      //         ? {
      //           time: clock + index,
      //         } : {},
      //         function: () => {
      //           setPreview("terminal", ({ content } = { content: "" }) => ({
      //             content: content + character,
      //           }));
      //         },
      //       }

      // );

      return index + dt + 1;
    }, 0);

    return () => {
      remove("terminal");
    };
  }, [children]);
  // console.log(children);

  // const { interval = 50 } = animation || {};
  // let timeout = 0;

  // useEffect(() => {
  //   if (animation)
  //     setAnimationEvents(
  //       children.map((line) => ({
  //         time: Math.floor(animation.clock + (line.animation?.delay || 0)),
  //         event: () => setLines((current) => [...current, line]),
  //       }))
  //     );
  // }, [children]);

  // useEffect(() => {
  //   if (animation) {
  //     setLines([]);

  //     setAnimationEvents((events) => {
  //       const gone = events.filter((event) => event.time <= animation?.clock);
  //       gone.forEach(({ event }) => event());

  //       return events.filter(({ time }) => time > animation?.clock);
  //     });
  //   } else setLines(children);
  // }, [children]);

  // useEffect(() => {
  //   children.forEach((line, index) => {
  //     const previous = index ? children[index - 1] : null;
  //     const { delay = 1000, interval = 100 } = line.animation || {};

  //     setTimeout(() => {
  //       setLines((current) => [...current, line]);
  //     }, timeout);

  //     timeout +=
  //       delay +
  //       (previous?.type === "input"
  //         ? previous.content.length * (previous.animation?.interval || interval)
  //         : delay);
  //   });
  // }, [children]);

  // useEffect(() => {
  //   ref.current?.scroll({
  //     top: 2147483647,
  //   });
  // }, [lines]);

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
