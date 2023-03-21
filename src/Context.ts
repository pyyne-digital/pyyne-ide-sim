import { createContext, Dispatch, SetStateAction } from "react";
import { Theme } from "./themes/type";
import { TerminalLine } from "./Previews/Terminal/props";
import { Animation } from "./types";

export const defaultContext: {
  theme: [Theme, Dispatch<SetStateAction<Theme>>];
  animation?: Animation;

  code: {
    content: string;
    editable?: boolean;
    colours: {};
  };

  preview?: Partial<{
    terminal: {
      content: TerminalLine[];
    };
  }>;
} = {
  theme: [] as any,
  animation: {
    clock: 0,
    interval: 50,
    behaviour: {
      speed: 1,
      timidness: 1,
      confidence: 1,
    },
  },
  code: {
    content: "",
    editable: false,
    colours: {},
  },

  preview: {
    terminal: {
      content: [],
    },
  },
};

export const IdeSimContext = createContext(defaultContext);
