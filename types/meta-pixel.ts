export type MetaPixelValue = string | number | boolean | string[] | number[];

export type MetaPixelParameters = Record<string, MetaPixelValue>;

export interface MetaPixelFunction {
  (
    command: "track" | "trackCustom",
    eventName: string,
    parameters?: MetaPixelParameters,
  ): void;

  (command: "init", pixelId: string): void;
}
