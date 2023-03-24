import styled from "styled-components";
import { height as styleBarHeight } from "../Previews/StatusBar/styles";

export const padding = "10px";

export const PreviewContainer = styled.div`
  width: calc(100% - 2 * ${padding});
  height: calc(50% - 2 * ${padding});

  position: relative;

  padding: ${padding};

  overflow: auto;

  background: ${({ theme }) => theme.preview.background};
  color: ${({ theme }) => theme.code.text.default};
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;

  overflow: auto;
`;
