/**
 * Delivery inside Karachi.
 *
 * We dispatch from Gulshan-e-Iqbal Block 10, so the charge is set by how far
 * the rider has to go. The buyer picks their area at checkout and sees the
 * exact charge before placing the order.
 *
 * Zone names and area lists are translated in lib/i18n, keyed by the ids below.
 */

export type DeliveryZoneId = "near" | "central" | "wider" | "outer";

export type DeliveryZone = {
  id: DeliveryZoneId;
  fee: number;
};

export const deliveryZones: DeliveryZone[] = [
  { id: "near", fee: 200 },
  { id: "central", fee: 350 },
  { id: "wider", fee: 450 },
  { id: "outer", fee: 600 },
];

export const dispatchArea = "Gulshan-e-Iqbal Block 10, Karachi";

export function getZone(id: string | null | undefined): DeliveryZone | undefined {
  return deliveryZones.find((zone) => zone.id === id);
}

export function deliveryFee(id: string | null | undefined): number | null {
  return getZone(id)?.fee ?? null;
}

export const lowestFee = Math.min(...deliveryZones.map((z) => z.fee));
export const highestFee = Math.max(...deliveryZones.map((z) => z.fee));
