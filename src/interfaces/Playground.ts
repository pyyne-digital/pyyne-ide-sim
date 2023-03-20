import { ReactNode } from "react";

type Children = { children: ReactNode };

export type Playground = {
  Container: ({ children }: Children) => JSX.Element;
  ControlPanel: ({ children }: Children) => JSX.Element;
  Showcase: ({
    children,
    onSizeChange,
    initialWidth,
    initialHeight,
  }: Children & {
    initialWidth?: number;
    initialHeight?: number;
    onSizeChange?: React.Dispatch<
      React.SetStateAction<{
        width: number;
        height: number;
      }>
    >;
  }) => JSX.Element;
};
