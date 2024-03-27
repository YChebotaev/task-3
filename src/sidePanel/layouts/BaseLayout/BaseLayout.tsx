import { type FC, type ReactNode } from "react";
import { Root } from "./styled";
import { StatusBar } from "../../components/StatusBar";

export const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Root>
      <StatusBar />
      {children}
    </Root>
  );
};
