"use client";

import { useT } from "./Providers";

export default function TopBar() {
  const t = useT();
  const strip = [...t.announce, ...t.announce];
  return (
    <div className="overflow-hidden bg-band py-2.5 text-bandtext">
      <div className="marquee-track">
        {strip.map((message, index) => (
          <span
            key={`${message}-${index}`}
            className="flex items-center whitespace-nowrap px-6 text-[0.7rem] uppercase tracking-[0.18em]"
          >
            <span className="me-5 text-goldlight">✦</span>
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
