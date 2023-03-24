import { createContext, Dispatch, SetStateAction } from "react";
import { Theme } from "./themes/type";
import { TerminalLine } from "./Previews/Terminal/props";
import { State, TypingBehaviour } from "./types";
import { Position } from "./interfaces/Position";

export type HaltState = State<boolean>;
export type IntervalState = State<number>;
export type CodeState = State<
  {
    content: string;
    editable?: boolean;
    colours: {};

    cursorPosition: Position;
  },
  false
>;

export const defaultContext: {
  theme: [Theme, Dispatch<SetStateAction<Theme>>];
  animation?: TypingBehaviour;

  code: CodeState;
  halt: HaltState;
  interval: IntervalState;

  preview?: Partial<{
    terminal: {
      content: TerminalLine[];
    };
  }>;
} = {
  theme: [] as any,
  animation: {
    speed: 1,
    timidness: 1,
    confidence: 1,
  },

  halt: null!,
  code: null!,
  interval: null!,

  preview: {
    terminal: {
      content: [],
    },
  },
};

export const IdeSimContext = createContext(defaultContext);
