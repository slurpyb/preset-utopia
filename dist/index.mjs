// src/preset.ts
import { definePreset } from "@pandacss/dev";

// src/consts.ts
var defaultOptions = {
  minFontSize: 16,
  maxFontSize: 19,
  minWidth: 320,
  maxWidth: 1280,
  minTypeScale: 1.333,
  maxTypeScale: 1.618,
  positiveSteps: 11,
  negativeSteps: 4,
  customSizes: [
    "s-l",
    "s-xl",
    "s-2xl",
    "xs-m",
    "m-xl",
    "m-2xl",
    "m-3xl",
    "m-4xl",
    "l-2xl",
    "l-3xl",
    "l-4xl",
    "l-5xl",
    "xs-l",
    "2xl-6xl",
    "xl-4xl",
    "xl-6xl",
    "2xl-4xl",
    "l-7xl"
  ],
  positiveSpacingSteps: [1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5],
  negativeSpacingSteps: [0.5, 0.25, 0.125],
  labelStyle: "tshirt",
  longerShirtLabels: true
};

// src/lib/typography.ts
import { calculateTypeScale } from "utopia-core";

// src/lib/utils.ts
var upgradeShirtKey = (key) => {
  switch (key) {
    case "s":
      return "sm";
    case "m":
      return "md";
    case "l":
      return "lg";
    default:
      if (key.startsWith("s-")) {
        return `sm-${key.slice(2)}`;
      }
      if (key.startsWith("m-")) {
        return `md-${key.slice(2)}`;
      }
      if (key.startsWith("l-")) {
        return `lg-${key.slice(2)}`;
      }
      return key;
  }
};

// src/lib/typography.ts
var transformStep = (step, labelStyle, longerLabel) => ({
  [labelStyle === "tshirt" && longerLabel ? upgradeShirtKey(step.label) : step.label]: { value: step.clamp }
});
var createTypeScaleTokens = (options) => {
  return calculateTypeScale(options).reduce((acc, step) => Object.assign(acc, transformStep(step, options.labelStyle, options.longerShirtLabels)), {});
};

// src/lib/spacing.ts
import { calculateSpaceScale } from "utopia-core";
var transformSize = (size, longerLabel) => ({
  [longerLabel ? upgradeShirtKey(size.label) : size.label]: { value: size.clamp }
});
var createSpaceScaleTokens = (options) => {
  const spaceScale = calculateSpaceScale(options);
  const sizesTokens = spaceScale.sizes.reduce((acc, size) => Object.assign(acc, transformSize(size, options.longerShirtLabels)), {});
  const oneUpPairsTokens = spaceScale.oneUpPairs.reduce((acc, size) => Object.assign(acc, transformSize(size, options.longerShirtLabels)), {});
  const customPairsTokens = spaceScale.customPairs.reduce((acc, size) => Object.assign(acc, transformSize(size, options.longerShirtLabels)), {});
  return Object.assign({}, sizesTokens, oneUpPairsTokens, customPairsTokens);
};

// src/preset.ts
async function createPreset(options) {
  const presetOptions = options ?? defaultOptions;
  return definePreset({
    name: "@repo/preset-utopia",
    theme: {
      extend: {
        tokens: {
          fontSizes: createTypeScaleTokens({
            minFontSize: presetOptions.minFontSize ?? defaultOptions.minFontSize,
            maxFontSize: presetOptions.maxFontSize ?? defaultOptions.maxFontSize,
            minWidth: presetOptions.minWidth ?? defaultOptions.minWidth,
            maxWidth: presetOptions.maxWidth ?? defaultOptions.maxWidth,
            positiveSteps: presetOptions.positiveSteps ?? defaultOptions.positiveSteps,
            negativeSteps: presetOptions.negativeSteps ?? defaultOptions.negativeSteps,
            minTypeScale: presetOptions.minTypeScale ?? defaultOptions.minTypeScale,
            maxTypeScale: presetOptions.maxTypeScale ?? defaultOptions.maxTypeScale,
            labelStyle: presetOptions.labelStyle ?? defaultOptions.labelStyle,
            longerShirtLabels: true
          }),
          spacing: createSpaceScaleTokens({
            minSize: presetOptions.minFontSize ?? defaultOptions.minFontSize,
            maxSize: presetOptions.maxFontSize ?? defaultOptions.maxFontSize,
            minWidth: presetOptions.minWidth ?? defaultOptions.minWidth,
            maxWidth: presetOptions.maxWidth ?? defaultOptions.maxWidth,
            negativeSteps: presetOptions.negativeSpacingSteps ?? defaultOptions.negativeSpacingSteps,
            positiveSteps: presetOptions.positiveSpacingSteps ?? defaultOptions.positiveSpacingSteps,
            customSizes: presetOptions.customSizes ?? defaultOptions.customSizes,
            longerShirtLabels: presetOptions.longerShirtLabels ?? defaultOptions.longerShirtLabels
          })
        }
      }
    }
  });
}

// src/index.ts
var index_default = createPreset;
export {
  createPreset,
  index_default as default
};
