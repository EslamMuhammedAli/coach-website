import i18n from "@/lib/i18n/config";

export const OFFER = {
  discountValue: "50%",
  whatsappNumber: "201281618954",
  whatsappDisplay: "+20 128 161 8954",
  plans: [
    { id: "quarter", price: "1,500", was: "3,000", featured: true },
    { id: "month", price: "500", was: "1,000", featured: false },
  ],
  services: [
    { id: "remote" },
    { id: "nutrition" },
    { id: "whatsapp" },
    { id: "program" },
  ],
  posterServiceIds: ["remote", "nutrition", "whatsapp", "program"],
  endsAt: "2026-10-09T20:59:00.000Z",
} as const;

export function whatsappHref() {
  const text = encodeURIComponent(i18n.t("whatsapp_message"));
  return `https://wa.me/${OFFER.whatsappNumber}?text=${text}`;
}