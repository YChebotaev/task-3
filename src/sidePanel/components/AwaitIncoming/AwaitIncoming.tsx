import { useEffect, useState, type FC } from "react";
import { Button, Snackbar } from "@mui/joy";
import { type RTCSession } from "jssip/lib/RTCSession";
import { useNavigate } from "react-router";
import { useUA } from "../../hooks/useUA";
import { useSession } from "../../hooks/useSession";
import { useHistory } from "../../hooks/useHistory";

export const AwaitIncoming: FC = () => {
  const navigate = useNavigate();
  const [ua] = useUA();
  const [session, setSession] = useSession();
  const [_, setHistory] = useHistory();
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const onEnded = () => {
      setShowSnackbar(false);
    };
    const onAccepted = (...args) => {
      setShowSnackbar(false);
    };
    const onNewRTCSession = ({
      session,
      request,
    }: {
      session: RTCSession;
      request: any;
    }) => {
      session.addListener("ended", onEnded);
      session.addListener("accepted", onAccepted);
      session.addListener("trackadded", () => {
        console.log("!!!", "trackAdded", "!!!");
      });

      setHistory((history) =>
        history.concat({
          direction: "incoming",
          phone: session.remote_identity.uri.toString(),
        }),
      );

      setSession(session);
      setShowSnackbar(true);
    };

    ua.addListener("newRTCSession", onNewRTCSession);

    return () => {
      setSession((session) => {
        if (session) {
          session.removeListener("ended", onEnded);
          session.removeListener("accepted", onAccepted);
        }

        return session;
      });

      ua.removeListener("newRTCSession", onNewRTCSession);
    };
  }, []);

  return (
    <Snackbar
      open={showSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        setShowSnackbar(false);
      }}
    >
      Входящий вызов
      <Button
        onClick={() => {
          session.answer();

          navigate("/incoming");
        }}
      >
        Ответить
      </Button>
    </Snackbar>
  );
};
