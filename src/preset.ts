import type { Preset } from "@pandacss/types";
import { definePreset } from "@pandacss/dev";
import type { PresetOptions, UtopiaLabelStyle } from "./options";

import { defaultOptions } from "./consts";

import { createTypeScaleTokens } from "./lib/typography";
import { createSpaceScaleTokens } from "./lib/spacing";

export async function createPreset(options?: PresetOptions): Promise<Preset> {
	const presetOptions = options ?? defaultOptions;

	return definePreset({
		name: "@slurpyb/preset-utopia",
		theme: {
			extend: {
				tokens: {
					fontSizes: createTypeScaleTokens({
						minFontSize:
							presetOptions.minFontSize ?? defaultOptions.minFontSize,
						maxFontSize:
							presetOptions.maxFontSize ?? defaultOptions.maxFontSize,
						minWidth: presetOptions.minWidth ?? defaultOptions.minWidth,
						maxWidth: presetOptions.maxWidth ?? defaultOptions.maxWidth,
						positiveSteps:
							presetOptions.positiveSteps ?? defaultOptions.positiveSteps,
						negativeSteps:
							presetOptions.negativeSteps ?? defaultOptions.negativeSteps,
						minTypeScale:
							presetOptions.minTypeScale ?? defaultOptions.minTypeScale,
						maxTypeScale:
							presetOptions.maxTypeScale ?? defaultOptions.maxTypeScale,
						labelStyle:
							(presetOptions.labelStyle as UtopiaLabelStyle) ??
							defaultOptions.labelStyle,
						longerShirtLabels:
							presetOptions.longerShirtLabels ??
							defaultOptions.longerShirtLabels,
					}),
					spacing: createSpaceScaleTokens({
						minSize: presetOptions.minFontSize ?? defaultOptions.minFontSize,
						maxSize: presetOptions.maxFontSize ?? defaultOptions.maxFontSize,
						minWidth: presetOptions.minWidth ?? defaultOptions.minWidth,
						maxWidth: presetOptions.maxWidth ?? defaultOptions.maxWidth,
						negativeSteps:
							presetOptions.negativeSpacingSteps ??
							defaultOptions.negativeSpacingSteps,
						positiveSteps:
							presetOptions.positiveSpacingSteps ??
							defaultOptions.positiveSpacingSteps,
						customSizes:
							presetOptions.customSizes ?? defaultOptions.customSizes,
						longerShirtLabels:
							presetOptions.longerShirtLabels ??
							defaultOptions.longerShirtLabels,
					}),
				},
			},
		},
	});
}
