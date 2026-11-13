import { useEffect, useState } from "react";

/** Current wall-clock time in a given IANA time zone, e.g. "10:42 pm". */
export function useLocalTime(timeZone: string): string {
  const format = () =>
    new Intl.DateTimeFormat("en-AU", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 20_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}
