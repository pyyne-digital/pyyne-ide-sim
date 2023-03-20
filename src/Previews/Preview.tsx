import { PreviewContainer } from "./styles";

interface Props {
  children: React.ReactNode;
}

export function Preview({ children }: Props) {
  return <PreviewContainer>{children}</PreviewContainer>;
}
