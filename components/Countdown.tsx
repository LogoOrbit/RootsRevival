"use client";

import { useEffect, useState } from "react";
import { useT } from "./Providers";

/** Midnight on the last day of the current month, Pakistan time. */
function offerDeadline(): number {
  const now = new Date();
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 19, 0, 0)
  );
  return end.getTime();
}

function parts(ms: number) {
  const clamped = Math.max(0, ms);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export default function Countdown({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const t = useT();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const deadline = offerDeadline();
    const tick = () => setLeft(deadline - Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const value = parts(left ?? 0);
  const cells = [
    { value: value.days, label: t.common.days },
    { value: value.hours, label: t.common.hours },
    { value: value.minutes, label: t.common.minutes },
    { value: value.seconds, label: t.common.seconds },
  ];

  const box =
    tone === "light"
      ? "bg-bandtext/10 text-bandtext border-bandtext/20"
      : "bg-card text-heading border-border";

  return (
    <div className={compact ? "flex items-center gap-2" : "text-center"}>
      {!compact ? (
        <p
          className={`eyebrow ${tone === "light" ? "text-goldlight" : "text-gold"}`}
        >
          {t.common.endsIn}
        </p>
      ) : null}
      <div
        className={`flex gap-2 ${compact ? "" : "mt-3 justify-center"} ${
          left === null ? "opacity-0" : "opacity-100"
        } transition-opacity`}
      >
        {cells.map((cell) => (
          <div
            key={cell.label}
            className={`rounded-xl border text-center ${box} ${
              compact
                ? "min-w-11 px-1.5 py-1 sm:min-w-14 sm:px-3 sm:py-2"
                : "min-w-16 px-3 py-2 sm:min-w-20"
            }`}
          >
            <span
              className={`block font-display leading-none ${
                compact ? "text-base sm:text-xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {String(cell.value).padStart(2, "0")}
            </span>
            <span
              className={`mt-0.5 block uppercase tracking-[0.1em] opacity-70 ${
                compact ? "text-[0.5rem] sm:text-[0.58rem]" : "text-[0.58rem] sm:text-[0.6rem]"
              }`}
            >
              {cell.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
