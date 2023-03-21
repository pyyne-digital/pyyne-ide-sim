export type TerminalLine =
  | {
      type: "input";
      content: string;
      prompt?: string;

      animation?: Partial<{
        time: number;
        delay: number;
      }>;
    }
  | {
      type: "output";
      content: string;

      animation?: Partial<{
        delay: number;
      }>;
    };

export type Props = {
  lines: TerminalLine[];
};
