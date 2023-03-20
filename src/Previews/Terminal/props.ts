export type TerminalLine = {
  content: string;
  type: "input" | "output";

  animation?: {
    delay?: number;
    interval?: number;
  };
};

export type Props = {
  lines: TerminalLine[];
};
