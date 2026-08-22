import Link from "next/link";
import { Emblem } from "@/components/Logo";
import { Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section tone="cream">
      <div className="card mx-auto max-w-xl p-12 text-center">
        <Emblem className="mx-auto h-24 w-24" />
        <p className="eyebrow mt-6 text-gold">Page not found</p>
        <h1 className="mt-4 text-4xl">This page has gone to root</h1>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-sm leading-relaxed text-muted">
          The link you followed does not exist any more. Let us take you back to the
          shop, where the oil is waiting.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-gold">
            Back Home
          </Link>
          <Link href="/shop" className="btn btn-outline">
            Visit The Shop
          </Link>
        </div>
      </div>
    </Section>
  );
}
