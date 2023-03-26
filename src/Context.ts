import { createContext, Dispatch, SetStateAction } from "react";
import { Theme } from "./themes/type";
import { State, TypingBehaviour } from "./types";
import { Position } from "./interfaces/Position";

export type HaltState = State<boolean>;
export type IntervalState = State<number>;
export type CodeState = State<
  {
    focus: boolean;
    content: string;
    editable?: boolean;
    colours: {};

    cursorPosition: Position;
  },
  false
>;

export type PreviewState = State<
  Partial<{
    terminal: {
      content: string;
    };
  }>,
  false
>;

export const defaultContext: {
  theme: [Theme, Dispatch<SetStateAction<Theme>>];
  animation?: TypingBehaviour;

  code: CodeState;
  halt: HaltState;
  interval: IntervalState;

  preview: PreviewState;
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
  preview: null!,
};

export const IdeSimContext = createContext(defaultContext);
