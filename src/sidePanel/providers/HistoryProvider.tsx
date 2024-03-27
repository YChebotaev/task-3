import { createContext, useState, type FC, type ReactNode } from "react";

export type HistoryRecord = {
  direction: "outgoing" | "incoming";
  phone: string;
};

export type History = HistoryRecord[];

export const context = createContext<{
  history: History;
  setHistory(history: History): void;
} | null>(null);

export const HistoryProvider: FC<{ history: History; children: ReactNode }> = ({
  history: initialHistory,
  children,
}) => {
  const [history, setHistory] = useState(initialHistory);

  return (
    <context.Provider value={{ history, setHistory }}>
      {children}
    </context.Provider>
  );
};
