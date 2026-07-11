export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.fbq?.("track", eventName, parameters);
}

export function trackMetaCustomEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.fbq?.("trackCustom", eventName, parameters);
}
