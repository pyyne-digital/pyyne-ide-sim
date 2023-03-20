import { createContext, Dispatch, SetStateAction } from "react";
import { Theme } from "./themes/type";

export const defaultContext: {
  theme: [Theme, Dispatch<SetStateAction<Theme>>];
  code: {
    content: string;
    editable?: boolean;
    colours: {};
  };

  preview?: Partial<{
    terminal: {
      content: string;
    };
  }>;
} = {
  theme: [] as any,
  code: {
    content: "",
    editable: false,
    colours: {},
  },

  preview: {
    terminal: {
      content: "",
    },
  },
};

export const IdeSimContext = createContext(defaultContext);
