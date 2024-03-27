import { useEffect, useState, useMemo, type FC } from "react";
import { Button } from "@mui/joy";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type RTCSession } from "jssip/lib/RTCSession";
import { useUA } from "../hooks/useUA";
import { useHistory } from "../hooks/useHistory";
import { BullseyeLayout } from "../layouts/BullseyeLayout";
import { Timer } from "../components/Timer";

export const CallPage: FC = () => {
  const navigate = useNavigate();
  const [ua] = useUA();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");
  const [_, setHistory] = useHistory();
  const [session, setSession] = useState<RTCSession | null>(null);
  const [state, setState] = useState<
    "init" | "accepted" | "confirmed" | "failed" | "ended"
  >("init");
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const session = ua.call(phone, {
      mediaConstraints: {
        audio: true,
        video: false,
      },
    });

    setSession(session);

    const onEnded = () => {
      setHistory((history) =>
        history.concat([
          {
            direction: "outgoing",
            phone,
          },
        ]),
      );

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
      setSession(null);

      session.removeListener("ended", onEnded);
      session.removeListener("failed", onFailed);
      session.removeListener("accepted", onAccepted);
      session.removeListener("confirmed", onConfirmed);
    };
  }, [ua, phone]);

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
