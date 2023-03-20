import styled from "styled-components";

export const height = "30px";
export const padding = "5px";

export const Container = styled.div`
  width: calc(100% - (2 * ${padding}));
  height: ${height};

  background-color: ${({ theme }) => theme.status?.background};

  &,
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 ${padding};

    > * {
      padding: 0 0 0 10px;
    }
  }
`;

export const FilePath = styled.div`
  color: ${({ theme }) => theme.status.text.strong};
`;

export const EditorStats = styled.div`
  color: ${({ theme }) => theme.status.text.weak};
`;
