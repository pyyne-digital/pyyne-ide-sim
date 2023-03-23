import { useContext, useEffect, useRef, useState } from "react";
import { IdeSimContext } from "../Context";
import { Line } from "../Line/Line";
import { ContentContainer } from "./styles";
import { TerminalLine } from "./Terminal/props";
// import { AnimationEvent } from "../types";

interface Props {
  children: TerminalLine[];
}

export function Terminal({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null!);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const { animation } = useContext(IdeSimContext);
  const [animationEvents, setAnimationEvents] = useState<AnimationEvent[]>([]);

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
          <Line key={i} typingInterval={0}>
            {content}
          </Line>
        ))}
    </ContentContainer>
  );
}
