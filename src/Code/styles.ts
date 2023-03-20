import styled from "styled-components";
import { height as styleBarHeight } from "../Previews/StatusBar/styles";
import { ColourTypes } from "./coloursType";

export const Container = styled.div<{
  colours: ColourTypes;
}>`
  width: 100%;
  height: calc(50% - ${styleBarHeight});

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
