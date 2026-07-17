"use client";

import { sendGAEvent } from "@next/third-parties/google";

type TrackingValue = string | number | boolean;

type TrackingParameters = Record<string, TrackingValue>;

export const WHATSAPP_CTA_LOCATIONS = [
  "header",
  "hero",
  "schedule",
  "final_cta",
] as const;

export type WhatsAppCtaLocation = (typeof WHATSAPP_CTA_LOCATIONS)[number];

type TrackWhatsAppClickParams = {
  location: WhatsAppCtaLocation;
  ctaText?: string;
};

declare global {
  interface Window {
    fbq?: (
      command: "track" | "trackCustom",
      eventName: string,
      parameters?: TrackingParameters,
    ) => void;
  }
}

export function trackMetaEvent(
  eventName: string,
  parameters?: TrackingParameters,
) {
  if (typeof window === "undefined" || !window.fbq) {
    return;
  }

  window.fbq("track", eventName, parameters);
}

export function trackMetaCustomEvent(
  eventName: string,
  parameters?: TrackingParameters,
) {
  if (typeof window === "undefined" || !window.fbq) {
    return;
  }

  window.fbq("trackCustom", eventName, parameters);
}

export function trackWhatsAppClick({
  location,
  ctaText = "Reservar clase de prueba gratis",
}: TrackWhatsAppClickParams) {
  const sharedParameters = {
    cta_location: location,
    cta_text: ctaText,
    contact_method: "whatsapp",
  };

  // Google Analytics 4
  sendGAEvent("event", "click_whatsapp", sharedParameters);

  // Meta Pixel
  trackMetaEvent("Contact", {
    content_name: "whatsapp",
    content_category: "contact",
    ...sharedParameters,
  });
}
