export type TerminalLine =
  | {
      type: "input";
      pre?: string;
      pos?: string;
      delay?: number;
      duration?: number;
      content: string;

      timeCurve?: (clock: number) => number;
    }
  | {
      type: "output";
      delay?: number;
      content: string;
    };

export type Props = {
  lines: TerminalLine[];
};
