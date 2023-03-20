import styled from "styled-components";
import { height as styleBarHeight } from "../Previews/StatusBar/styles";

export const PreviewContainer = styled.div`
  width: 100%;
  height: calc(50% - 2 * ${styleBarHeight});

  position: relative;

  padding: 10px;

  overflow: scroll hidden;

  background: ${({ theme }) => theme.preview.background};
  color: ${({ theme }) => theme.code.text.default};
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
`;
