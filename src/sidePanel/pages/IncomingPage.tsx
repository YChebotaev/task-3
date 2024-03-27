import { useEffect, useState, useMemo, type FC } from "react";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { BullseyeLayout } from "../layouts/BullseyeLayout";
import { Timer } from "../components/Timer";
import { useSession } from "../hooks/useSession";

export const IncomingPage: FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useSession();
  const [state, setState] = useState<
    "init" | "accepted" | "confirmed" | "failed" | "ended"
  >("init");
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const onEnded = () => {
      setState("ended");
    };
    const onFailed = () => {
      setState("failed");
      setError("...Ошибка...");
    };
    const onAccepted = () => {
      setState("accepted");
    };
    const onConfirmed = () => {
      setState("confirmed");
    };

    session.addListener("ended", onEnded);
    session.addListener("failed", onFailed);
    session.addListener("accepted", onAccepted);
    session.addListener("confirmed", onConfirmed);

    return () => {
      setSession(null)

      session.removeListener("ended", onEnded);
      session.removeListener("failed", onFailed);
      session.removeListener("accepted", onAccepted);
      session.removeListener("confirmed", onConfirmed);
    };
  }, [session]);

  const stateUi = useMemo(() => {
    switch (state) {
      case "init":
        return <div>Инициализируется</div>;
      case "accepted":
        return <div>Принят</div>;
      case "confirmed":
        return (
          <div>
            <div>Идет звонок</div>
            <div>
              <Timer />
            </div>
            <div>
              <Button
                onClick={() => {
                  session.terminate();
                }}
              >
                Завершить
              </Button>
            </div>
          </div>
        );
      case "failed":
        return (
          <div>
            <div>Ошибка</div>
            <div>
              <Button
                onClick={() => {
                  navigate("/history");
                }}
              >
                Вернуться
              </Button>
            </div>
          </div>
        );
      case "ended":
        return (
          <div>
            <div>Завершен</div>
            <div>
              <Button
                onClick={() => {
                  navigate("/history");
                }}
              >
                Вернуться
              </Button>
            </div>
          </div>
        );
    }
  }, [state]);

  return <BullseyeLayout>{stateUi}</BullseyeLayout>;
};
