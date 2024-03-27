import { type FC } from "react";
import { Root } from "./styled";
import { CallControl } from "./CallControl";

export const StatusBar: FC = () => {
  return (
    <Root>
      <CallControl />
    </Root>
  );
};
