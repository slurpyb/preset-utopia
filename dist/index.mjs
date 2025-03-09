// src/preset.ts
import { definePreset } from "@pandacss/dev";

// src/consts.ts
var defaultOptions = {
  minFontSize: 16,
  maxFontSize: 19,
  minWidth: 320,
  maxWidth: 1280,
  minTypeScale: 1.125,
  maxTypeScale: 1.333,
  positiveSteps: 11,
  negativeSteps: 4,
  customSizes: [],
  positiveSpacingSteps: [1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5],
  negativeSpacingSteps: [0.5, 0.25, 0.125],
  labelStyle: "tshirt",
  longerShirtLabels: false
};

// src/lib/typography.ts
import { calculateTypeScale } from "utopia-core";

// src/lib/utils.ts
var pandaToken = (label, clamp) => ({ [label]: { value: clamp } });
var extendedLabel = (label, tw) => {
  switch (label) {
    case "s":
      return "sm";
    case "m":
      return "md";
    case "l":
      return "lg";
    case "base":
      return tw ? label : "base";
    default:
      return label;
  }
};

// src/lib/typography.ts
var fontToken = (step, labelStyle, extend) => {
  switch (labelStyle) {
    case "tshirt":
      return pandaToken(extend ? extendedLabel(step.label) : step.label, step.clamp);
    case "tailwind":
      return pandaToken(step.label, step.clamp);
    default:
      return pandaToken(step.label, step.clamp);
  }
};
var createTypeScaleTokens = (options) => {
  const { labelStyle = "utopia", longerShirtLabels = false, ...rest } = options;
  return calculateTypeScale({ labelStyle, ...rest }).reduce(
    (acc, step) => Object.assign(
      acc,
      fontToken(step, labelStyle, longerShirtLabels)
    ),
    {}
  );
};

// src/lib/spacing.ts
import {
  calculateSpaceScale
} from "utopia-core";
var extendedPairLabel = (pair) => {
  let [fromLabel, toLabel] = pair.split("-");
  const extendedLabels = {
    s: "sm",
    m: "md",
    l: "lg",
    base: "md"
  };
  fromLabel = extendedLabels[fromLabel] ?? fromLabel;
  toLabel = extendedLabels[toLabel] ?? toLabel;
  return `${fromLabel}-${toLabel}`;
};
var sizeToken = (size, labelStyle, extend) => {
  switch (labelStyle) {
    case "tshirt":
      return pandaToken(extend ? extendedLabel(size.label) : size.label, size.clamp);
    case "tailwind":
      return pandaToken(extendedLabel(size.label, true), size.clamp);
    default:
      return pandaToken(size.label, size.clamp);
  }
};
var pairToken = (pair, labelStyle, extend) => {
  switch (labelStyle) {
    case "tshirt":
      return pandaToken(extend ? extendedPairLabel(pair.label) : pair.label, pair.clamp);
    case "tailwind":
      return pandaToken(extendedPairLabel(pair.label), pair.clamp);
    default:
      return pandaToken(pair.label, pair.clamp);
  }
};
var createSpaceScaleTokens = (options) => {
  const { labelStyle = "utopia", longerShirtLabels = false, ...rest } = options;
  const spaceScale = calculateSpaceScale(rest);
  const sizesTokens = spaceScale.sizes.reduce(
    (acc, size) => Object.assign(acc, sizeToken(size, labelStyle, longerShirtLabels)),
    {}
  );
  const oneUpPairsTokens = spaceScale.oneUpPairs.reduce(
    (acc, size) => Object.assign(acc, pairToken(size, labelStyle, longerShirtLabels)),
    {}
  );
  const customPairsTokens = spaceScale.customPairs.reduce(
    (acc, size) => Object.assign(acc, pairToken(size, labelStyle, longerShirtLabels)),
    {}
  );
  return Object.assign({}, sizesTokens, oneUpPairsTokens, customPairsTokens);
};

// src/preset.ts
async function createPreset(options) {
  const presetOptions = options ?? defaultOptions;
  return definePreset({
    name: "@slurpyb/preset-utopia",
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
            longerShirtLabels: presetOptions.longerShirtLabels ?? defaultOptions.longerShirtLabels
          }),
          spacing: createSpaceScaleTokens({
            minSize: presetOptions.minFontSize ?? defaultOptions.minFontSize,
            maxSize: presetOptions.maxFontSize ?? defaultOptions.maxFontSize,
            minWidth: presetOptions.minWidth ?? defaultOptions.minWidth,
            maxWidth: presetOptions.maxWidth ?? defaultOptions.maxWidth,
            negativeSteps: presetOptions.negativeSpacingSteps ?? defaultOptions.negativeSpacingSteps,
            positiveSteps: presetOptions.positiveSpacingSteps ?? defaultOptions.positiveSpacingSteps,
            customSizes: presetOptions.customSizes ?? defaultOptions.customSizes,
            labelStyle: presetOptions.labelStyle ?? defaultOptions.labelStyle,
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
  createPreset as createUtopiaPreset,
  index_default as default
};
