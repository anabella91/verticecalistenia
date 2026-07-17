import type { MetaPixelFunction } from "./meta-pixel";

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
  }
}

export {};
