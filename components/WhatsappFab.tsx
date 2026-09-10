"use client";

import { usePathname } from "next/navigation";
import { brand, waLink } from "@/lib/brand";
import { WhatsappIcon } from "./Icons";

export default function WhatsappFab() {
  const pathname = usePathname();
  const lifted = !["/checkout", "/thankyou", "/cart"].some((path) =>
    pathname.startsWith(path)
  );

  return (
    <a
      href={waLink(
        `Assalam o Alaikum ${brand.name} team, I would like to place an order.`
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className={`press fixed end-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1faa54] text-white shadow-[0_12px_30px_rgba(31,170,84,0.4)] ${
        lifted ? "bottom-32 sm:bottom-28" : "bottom-5"
      }`}
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
