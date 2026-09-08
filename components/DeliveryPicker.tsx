"use client";

import { useCart } from "./CartProvider";
import { useT } from "./Providers";
import { formatPrice } from "@/lib/brand";
import { deliveryZones } from "@/lib/delivery";
import { TruckIcon } from "./Icons";

/**
 * We dispatch by rider from Gulshan-e-Iqbal, so the charge depends on how far
 * the parcel travels. The buyer picks their area and sees the exact charge
 * before they order.
 */
export default function DeliveryPicker({ id = "zone" }: { id?: string }) {
  const { zoneId, setZone } = useCart();
  const t = useT();

  return (
    <div>
      <label className="label" htmlFor={id}>
        {t.delivery.pickLabel}
      </label>
      <select
        id={id}
        className="field"
        value={zoneId}
        onChange={(event) => setZone(event.target.value)}
      >
        <option value="">{t.delivery.pickPlaceholder}</option>
        {deliveryZones.map((zone) => (
          <option key={zone.id} value={zone.id}>
            {t.delivery.zones[zone.id].label} — {formatPrice(zone.fee)}
          </option>
        ))}
      </select>
      <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-muted">
        <span className="mt-0.5 shrink-0 text-gold">
          <TruckIcon className="h-4 w-4" />
        </span>
        {zoneId
          ? t.delivery.zones[zoneId as keyof typeof t.delivery.zones]?.areas
          : t.delivery.pickHint}
      </p>
    </div>
  );
}
