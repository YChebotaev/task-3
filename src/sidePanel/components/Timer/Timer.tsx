import { useState, useMemo, useEffect, type FC } from "react";
import { intervalToDuration, formatDuration } from "date-fns";
import { ru } from "date-fns/locale/ru";

export const Timer: FC = () => {
  const start = useMemo(() => new Date().getTime(), []);
  const [end, setEnd] = useState(start);

  useEffect(() => {
    const i = setInterval(() => {
      setEnd(new Date().getTime());
    });

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <div>
      {formatDuration(intervalToDuration({ start, end }), { locale: ru })}
    </div>
  );
};
