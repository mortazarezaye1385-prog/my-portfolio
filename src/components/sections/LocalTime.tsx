"use client";

import { useEffect, useState } from "react";

/** Live local time in the developer's timezone. Renders a stable placeholder on the server. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return <time className="tabular-nums">{time ?? "--:--"}</time>;
}
