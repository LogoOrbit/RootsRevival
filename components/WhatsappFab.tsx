import { brand, waLink } from "@/lib/brand";
import { WhatsappIcon } from "./Icons";

export default function WhatsappFab() {
  return (
    <a
      href={waLink(
        `Assalam o Alaikum ${brand.name} team, I would like to place an order.`
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#1faa54] px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(31,170,84,0.35)] transition-transform hover:scale-105"
    >
      <WhatsappIcon className="h-6 w-6" />
      <span className="hidden sm:inline">Order on WhatsApp</span>
    </a>
  );
}
