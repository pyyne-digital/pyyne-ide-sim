import { ShowcaseProps } from "interfaces/props";
import { ReactNode } from "react";

type Children = { children?: ReactNode };

export type Playground = {
  Container: (props: Children) => JSX.Element;
  ControlPanel: (props: Children) => JSX.Element;
  Showcase: (props: ShowcaseProps) => JSX.Element;
};
