import styled from "styled-components";
import { height as styleBarHeight } from "../Previews/StatusBar/styles";
import { ColourTypes } from "./coloursType";

export const padding = "20px";

export const Container = styled.div<{
  colours: ColourTypes;
  full?: boolean;
  secondaryComponentHeight?: number;
}>`
  width: calc(100% - ${padding});
  height: ${({ full, secondaryComponentHeight = "0px" }) =>
    `calc(${
      full ? 100 : 50
    }% - ((2 * ${padding}) + ${styleBarHeight} + ${secondaryComponentHeight}))`};

  padding: 20px;

  overflow: auto;

  transition: all 0.3s ease-in-out;

  background: ${({ theme }) => theme.code.background};
  color: ${({ theme }) => theme.code.text.default};

  .hljs-keyword {
    color: ${({ colours }) => colours?.keyword ?? colours?.default};
  }

  .hljs-built_in {
    color: ${({ colours }) => colours?.built_in ?? colours?.default};
  }

  .hljs-number {
    color: ${({ colours }) => colours?.number ?? colours?.default};
  }

  .hljs-string {
    color: ${({ colours }) => colours?.string ?? colours?.default};
  }

  .hljs-title.function_ {
    color: ${({ colours }) => colours?.["title.function_"] ?? colours?.default};
  }

  .hljs-attr {
    color: ${({ colours }) => colours?.attr ?? colours?.default};
  }
`;
