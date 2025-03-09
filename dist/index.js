"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createUtopiaPreset: () => createPreset,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/preset.ts
var import_dev = require("@pandacss/dev");

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
var import_utopia_core = require("utopia-core");

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
  return (0, import_utopia_core.calculateTypeScale)({ labelStyle, ...rest }).reduce(
    (acc, step) => Object.assign(
      acc,
      fontToken(step, labelStyle, longerShirtLabels)
    ),
    {}
  );
};

// src/lib/spacing.ts
var import_utopia_core2 = require("utopia-core");
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
  const spaceScale = (0, import_utopia_core2.calculateSpaceScale)(rest);
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
  return (0, import_dev.definePreset)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUtopiaPreset
});
