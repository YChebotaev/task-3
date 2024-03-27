import { createContext, useState, type FC, type ReactNode } from "react";
import { type RTCSession } from "jssip/lib/RTCSession";

export const context = createContext<{
  session: RTCSession | null;
  setSession(ua: RTCSession | ((s: RTCSession) => RTCSession) | null): void;
} | null>(null);

export const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<RTCSession | null>(null);

  return (
    <context.Provider value={{ session, setSession }}>
      {children}
    </context.Provider>
  );
};
