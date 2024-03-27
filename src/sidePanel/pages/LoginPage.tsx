import { type FC } from "react";
import { UA, WebSocketInterface } from "jssip";
import { useNavigate } from "react-router";
import { BullseyeLayout } from "../layouts/BullseyeLayout";
import { LoginForm } from "../components/LoginForm";
import { useUA } from "../hooks/useUA";
import { createUa } from "../lib/createUA";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [_, setUa] = useUA();

  return (
    <BullseyeLayout>
      <LoginForm
        onLogin={async (credentials) => {
          await chrome.storage.local.set({ credentials });

          const ua = createUa(credentials);

          setUa(ua);

          navigate("/connect");
        }}
      />
    </BullseyeLayout>
  );
};
