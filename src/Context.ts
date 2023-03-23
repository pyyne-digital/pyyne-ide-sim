import { createContext, Dispatch, SetStateAction } from "react";
import { Theme } from "./themes/type";
import { TerminalLine } from "./Previews/Terminal/props";
import { TypingBehaviour } from "./types";
import { Position } from "./interfaces/Position";

export type CodeStateObject = {
  content: string;
  editable?: boolean;
  colours: {};

  cursorPosition: Position;
};

export type CodeState = [
  CodeStateObject,
  (
    key: keyof CodeStateObject,
    value:
      | CodeStateObject[typeof key]
      | ((value: CodeStateObject[typeof key]) => CodeStateObject[typeof key])
  ) => void
];

export const defaultContext: {
  theme: [Theme, Dispatch<SetStateAction<Theme>>];
  animation?: TypingBehaviour;

  code: CodeState;

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
  code: null!,

  preview: {
    terminal: {
      content: [],
    },
  },
};

export const IdeSimContext = createContext(defaultContext);
