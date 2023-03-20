import { pointer } from "helpers";
import { Theme } from "ide-sim-component/themes/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

export const Styled = {
  Group: styled.div<{ indent: number }>`
    margin-left: ${({ indent }) => `${indent * 10}`}px;
  `,

  Row: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};

interface RowProps {
  name: string;
  path: string;
  initialValue?: string;

  theme: [Theme, Dispatch<SetStateAction<Theme>>];
}

export const Group = Styled.Group;

export function Row({
  name,
  path,
  initialValue = "#FFFFFF",
  theme: [theme, setTheme],
}: RowProps) {
  const fp = `${path}.${name}`;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (pointer(theme)(fp)) setTheme(pointer(theme)(fp, value));
  }, [value]);

  return (
    <Styled.Row>
      {name}:{" "}
      <input
        type="color"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Styled.Row>
  );
}
