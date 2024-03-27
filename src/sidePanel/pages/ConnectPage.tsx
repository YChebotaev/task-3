import { useEffect, useState, type FC, useMemo } from "react";
import { useNavigate } from "react-router";
import { Box, Button } from "@mui/joy";
import { useUA } from "../hooks/useUA";
import { BullseyeLayout } from "../layouts/BullseyeLayout";

export const ConnectPage: FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<
    "init" | "connecting" | "connected" | "registrationFailed"
  >("init");
  const [ua] = useUA();

  useEffect(() => {
    const onConnecting = () => setState("connecting");
    const onConnected = () => setState("connected");
    const onRegistrationFailed = () => setState("registrationFailed");

    ua.addListener("connecting", onConnecting);
    ua.addListener("connected", onConnected);
    ua.addListener("registrationFailed", onRegistrationFailed);

    ua.start();

    return () => {
      ua.removeListener("connecting", onConnecting);
      ua.removeListener("connected", onConnected);
      ua.removeListener("registrationFailed", onRegistrationFailed);
    };
  }, [ua]);

  const stateUi = useMemo(() => {
    switch (state) {
      case "init":
        return null;
      case "connecting":
        return <div>Соединяется</div>;
      case "connected":
        navigate("/history");

        return <div>Соединение установлено</div>;
      case "registrationFailed":
        return (
          <div>
            <div>Аутентификация не удалась</div>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                onClick={async () => {
                  await chrome.storage.local.remove("credentials");

                  navigate("/login");
                }}
              >
                Перезайти
              </Button>
            </Box>
          </div>
        );
    }
  }, [state]);

  return <BullseyeLayout>{stateUi}</BullseyeLayout>;
};
