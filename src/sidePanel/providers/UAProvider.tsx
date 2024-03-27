import { createContext, useState, type FC, type ReactNode } from "react";
import { type UA } from "jssip";

export const context = createContext<{
  ua: UA;
  setUa(ua: UA): void;
} | null>(null);

export const UAProvider: FC<{ ua: UA; children: ReactNode }> = ({
  ua: initialUa,
  children,
}) => {
  const [ua, setUa] = useState(initialUa);

  return <context.Provider value={{ ua, setUa }}>{children}</context.Provider>;
};
