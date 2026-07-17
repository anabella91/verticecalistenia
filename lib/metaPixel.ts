import type { MetaPixelParameters } from "../types/meta-pixel";

export function trackMetaEvent(
  eventName: string,
  parameters?: MetaPixelParameters,
) {
  if (typeof window === "undefined") {
    return;
  }

  const fbq = window.fbq;

  if (!fbq) {
    return;
  }

  fbq("track", eventName, parameters);
}

export function trackMetaCustomEvent(
  eventName: string,
  parameters?: MetaPixelParameters,
) {
  if (typeof window === "undefined") {
    return;
  }

  const fbq = window.fbq;

  if (!fbq) {
    return;
  }

  fbq("trackCustom", eventName, parameters);
}
