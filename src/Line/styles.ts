import styled from "styled-components";

export const Container = styled.code`
  display: flex;
  align-items: center;

  width: auto;
  height: 20px;
  padding: 2px 0;

  .line-number {
    min-width: 30px;

    opacity: 0.7;
  }

  .line-content {
    white-space: nowrap;
    outline: none;
  }
`;
