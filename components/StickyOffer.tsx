"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useT } from "./Providers";
import Countdown from "./Countdown";
import { TagIcon } from "./Icons";

const HIDDEN_ON = ["/checkout", "/thankyou", "/cart"];

/** A slim offer bar that slides up once the visitor starts reading. */
export default function StickyOffer() {
  const t = useT();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed || HIDDEN_ON.some((path) => pathname.startsWith(path))) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-5xl px-3 pb-3 sm:pb-4">
        <div className="flex items-center gap-3 rounded-2xl bg-band px-4 py-3 text-bandtext shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:px-6">
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-goldlight text-band sm:flex">
            <TagIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="hidden text-[0.7rem] uppercase tracking-[0.12em] text-goldlight sm:block">
              {t.common.endsIn}
            </p>
            <div className="sm:mt-1">
              <Countdown tone="light" compact />
            </div>
          </div>
          <Link
            href="/offers"
            className="btn btn-gold shrink-0 px-3 py-2 text-[0.6rem] sm:px-4 sm:py-2.5 sm:text-[0.68rem]"
          >
            {t.common.seeAllOffers}
          </Link>
          <button
            type="button"
            onClick={() => setClosed(true)}
            aria-label="close"
            className="shrink-0 rounded-full p-1 text-bandtext/60 transition-colors hover:text-bandtext"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
